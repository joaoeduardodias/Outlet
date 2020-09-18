const express = require('express')
const routes = express.Router()

const UserController = require('./database/controllers/UserController')
const SessionController = require('./database/controllers/SessionController')
    //  CRUD de usuários
routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.put('/users/:id', UserController.update)
routes.delete('/users/:id', UserController.delete)
    // route of Login 
routes.post('/session', SessionController.create)
module.exports = routes;