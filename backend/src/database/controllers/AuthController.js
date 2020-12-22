const Connection = require("../../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const transport = require("../../config/email/email");

module.exports = {
    async create(req, res, next) {
        try {
            // const [, hash] = req.headers.authorization.split(" ");
            // const [email, password] = Buffer.from(hash, "base64")
            //     .toString()
            //     .split(":");
            const teste1 = req.body
            const teste2 = req.files

            console.log("BODY" + teste1)
            console.log("FILES" + teste2)


            const verifyUser = await Connection("Users").join("Address", 'Users.id', "=", "id_users")
                .select("Users.email",
                    "Users.password",
                    "Users.id",
                    "Users.name",
                    "Users.administrador",
                    "Address.zip_code"
                )
                .where({ email })
                .first();
            if (!verifyUser) {
                return res.json({ message: "Email incorrect" });
            }


            bcrypt.compare(password, verifyUser.password, function(err, result) {
                if (err) {
                    return res.json({ message: "Ocorreu um erro" });
                }

                if (result == true) {
                    const { id, administrador, name, email, zip_code } = verifyUser;
                    const token = jwt.sign({ id, administrador, name, email, zip_code },
                        process.env.SECRET, {
                            expiresIn: 86400, // expires in 24 hr
                        }
                    );
                    res.header({
                        "auth_token": token,
                        "Access-Control-Expose-Headers": "auth_token"
                    })
                    return res.json({ message: "Valid" });
                }
                if (result == false) {
                    return res.status(401).json({ message: "Invalid  Password" });
                }
            });
        } catch (error) {
            next(error);
        }
    },

    async forgotPassword(req, res, next) {
        try {
            //   1- Verificar se o email está correto
            const [, hash] = req.headers.authorization.split(" ");
            const [email, ] = Buffer.from(hash, "base64")
                .toString()
                .split(":");

            const verifyUser = await Connection("Users")
                .select("email", "name", "id")
                .where("email", email)
                .first();
            if (!verifyUser) {
                return res.json({ message: "Email incorrect" });
            }
            // gerar o id da table token
            const id = crypto.randomBytes(3).toString("HEX");
            // obter user_id
            const user_id = verifyUser.id;
            const nameUser = verifyUser.name;
            //  2- Gerar token com data de expiração

            const token = crypto.randomBytes(20).toString("HEX");
            const now = new Date();
            now.setHours(now.getHours() + 1);
            const token_expired = now;
            await Connection("Tokens").insert({
                id,
                token,
                token_expired,
                user_id,
            });
            // 3- Gerar Link para o reset de senha com o token

            const resetLink = `${process.env.FRONT_URL}/reset/?token=${token}`;
            transport.sendMail({
                    to: email,
                    from: "suporte@Outlet.com.br",
                    template: "forgotpassword",
                    subject: "Outlet - Recuperação de Senha",
                    context: { email, nameUser, resetLink },
                },
                (error) => {
                    if (error) {
                        console.log(error);
                        return res
                            .status(400)
                            .json({ message: "Cannot send forgot password, try again" });
                    }

                    return res.json({ message: 'send' }).send()
                }
            );
        } catch (error) {
            next(error);
        }
    },
    async verifyToken(req, res, next) {
        try {
            const token = req.params.token;
            const [verify] = await Connection("Tokens")
                .select("user_id", "token_expired")
                .where("token", token);
            const [verifyUser] = await Connection("Users")
                .select("id")
                .where("id", verify.user_id);
            if (!verifyUser) {
                return res.status(401).json({ message: "Token Inválido" });
            }

            //  verify expired

            const now = new Date();

            if (now > verify.token_expired) {
                return res.status(401).json({ message: "Token expired" });
            }

            const [, hash] = req.headers.authorization.split(" ");
            const [, pwd] = Buffer.from(hash, "base64").toString().split(":");
            const password = await bcrypt.hash(pwd, 5);
            await Connection("Users")
                .update({
                    password,
                })
                .where("id", verifyUser.id);
            return res.status(200).send();
        } catch (error) {
            next(error);
        }
    },
};