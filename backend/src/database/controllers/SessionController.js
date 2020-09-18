const Connection = require("../../database/");

module.exports = {
    async create(req, res) {
        const { email, password } = req.body
        const auth = Connection('Users').authenticate()

        auth(email, password, (error, results) => {

        })


    },
};