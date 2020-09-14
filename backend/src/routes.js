const express = require('express')
const routes = express.Router()

routes.post('/users', (req, res) => {
    const data = req.body;
    console.log(data)

    return res.json({
        testando: "teste"
    })
})

module.exports = routes;