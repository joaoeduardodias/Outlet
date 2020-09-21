const express = require('express')
const routes = express.Router()
const jwt = require('jsonwebtoken');


async function midellwareauth(req, res, next) {
    const [, token] = req.headers.authorization.split(' ')
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    await jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Token invalid.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.id = decoded.id;

        next();
    })
}

const UserController = require('./database/controllers/UserController')
const AuthController = require('./database/controllers/AuthController')

//  CRUD de usuários
routes.get('/users', midellwareauth, UserController.index)
routes.get('/userss', UserController.index)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)

// routes of Login 
routes.post('/login', AuthController.create)
routes.post('/forgot', AuthController.forgotPassword)
routes.post('/reset/:token', AuthController.verifyToken)












module.exports = routes;