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
            const now = new Date();
            now.setHours(now.getHours()+1)
            const token_expired = now;
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
         
            const now = new Date()
           
            if (now > verify.token_expired) {
                return res.status(401).json({message: 'Token expired'})
            }
            
            const [, hash] = req.headers.authorization.split(" ");
            const [,pwd] = Buffer.from(hash, "base64")
                .toString()
                .split(":");
                const password = await bcrypt.hash(pwd, 5);
                await Connection("Users").update({
                    password
                }).where('id',verifyUser.id)
            return res.status(200).send()
       

        } catch (error) {
            next(error)
        }
    }
};