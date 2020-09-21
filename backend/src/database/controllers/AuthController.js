const Connection = require("../../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = {
    async create(req, res, next) {
        try {
            const [, hash] = req.headers.authorization.split(" ");
            const [email, password] = Buffer.from(hash, "base64")
                .toString()
                .split(":");

            const verifyUser = await Connection("Users")
                .select("email", "password", "id", "name", "administrador")
                .where("email", email)
                .first();
            if (!verifyUser) {
                return res.json({ message: "Email incorrect" });
            }

            bcrypt.compare(password, verifyUser.password, function(err, result) {
                if (err) {
                    return res.json({ message: "Ocorreu um erro" });
                }

                if (result == true) {
                    const { id, administrador, name } = verifyUser; //esse id vem do banco de dados

                    const token = jwt.sign({ id, administrador, name },
                        process.env.SECRET, {
                            expiresIn: 86400, // expires in 24 hr
                        }
                    );
                    //  res.json({ auth: true, token: token });
                    return res.header("auth-token", token).send();
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
            const [email] = Buffer.from(hash, "base64").toString().split(":");
            const verifyUser = await Connection("Users")
                .select("email", "id")
                .where("email", email)
                .first();
            if (!verifyUser) {
                return res.json({ message: "Email incorrect" });
            }

            // gerar o id da tablea token
            const id = crypto.randomBytes(3).toString("HEX");
            const user_id = verifyUser.id;
            //  2- Gerar token com data de expiração

            const token = crypto.randomBytes(20).toString("HEX");
            const token_expired = new Date().valueOf()
            await Connection("Tokens").insert({
                id,
                token,
                token_expired,
                user_id
            });
            // 3- Gerar Link para o reset de senha com o token

            const resetLink = `http://${req.headers.host}/reset/${token}`;
            res.json(resetLink);
        } catch (error) {
            next(error);
        }
    },
    async verifyToken(req, res, next) {
        try {

            const token = req.params.token
            const [verify] = await Connection('Tokens')
                .select('user_id', 'token_expired')
                .where('token', token)

            const [verifyUser] = await Connection('Users')
                .select('id')
                .where('id', verify.user_id)

            if (!verifyUser) { return res.status(401).json({ message: 'Token Inválido' }) }

            //  verify expired
            const date = verify.token_expired
            console.log(date)
            const date2 = new Date().valueOf()
            console.log(date2)
            if (date < date2) {
                return res.json({ message: 'token expired' })

            }









        } catch (error) {
            next(error)
        }
    }
};