const express = require('express')
const routes = express.Router()
const jwt = require('jsonwebtoken');
const multer = require('multer')
const multerConfig = require('./config/multer')


async function midellwareauth(req, res, next) {
    try {
        const [, token] = req.headers.authorization.split(' ')
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

        await jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token invalid.' });

            // se tudo estiver ok, salva no request para uso posterior
            req.id = decoded.id;

            next();
        })
    } catch (error) {
        next(error)
    }

}

const UserController = require('./database/controllers/UserController')
const AuthController = require('./database/controllers/AuthController');
const ProductController = require('./database/controllers/ProductController');
const User_Product = require('./database/controllers/User_Product');
const UploadController = require('./database/controllers/UploadController');

//  CRUD de usuários
routes.get('/users', midellwareauth, UserController.index)
routes.post('/users', UserController.create)
routes.put('/users/:id', midellwareauth, UserController.update)
routes.put('/usersADM/:id', midellwareauth, UserController.updateADM)
routes.delete('/users/:id', midellwareauth, UserController.delete)
routes.delete('/usersADM/:id', midellwareauth, UserController.deleteADM)

// routes of Login 
routes.post('/login', AuthController.create)
routes.post('/forgot', AuthController.forgotPassword)
routes.post('/reset/:token', AuthController.verifyToken)

// CRUD of Products

routes.get('/', ProductController.index)
routes.get('/show/:name', ProductController.show)
routes.post('/product', midellwareauth, ProductController.create)
routes.put('/product/:id', midellwareauth, ProductController.update)
routes.delete('/product/:id', midellwareauth, ProductController.delete)

//  Products_Sold

// list all sales- lista todas as vendas
routes.get('/product_sold', midellwareauth, User_Product.index)
    // list all sales between- lista todas as vendas entre 
routes.get('/product_sold_between', midellwareauth, User_Product.indexBetween)
routes.get('/product_sold_betweenCount', midellwareauth, User_Product.sumBetween)


routes.post('/product_sold/:id', midellwareauth, User_Product.create) // id do produto

// Upload 
routes.post('/upload/:idProduct', multer(multerConfig).array('image[]'), UploadController.create)
routes.get('/upload', UploadController.index)
routes.delete('/upload/:name', UploadController.delete)





module.exports = routes;