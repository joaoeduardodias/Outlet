const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
var login = multer();
const multerConfig = require("./config/multer");

async function midellwareauth(req, res, next) {
  try {
    const [, token] = req.headers.authorization.split(" ");
    if (!token)
      return res
        .status(401)
        .json({ auth: false, message: "No token provided." });

    await jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err)
        return res.status(500).json({ auth: false, message: "Token invalid." });

      // se tudo estiver ok, salva no request para uso posterior
      req.id = decoded.id;

      next();
    });
  } catch (error) {
    next(error);
  }
}

const UserController = require("./database/controllers/UserController");
const AuthController = require("./database/controllers/AuthController");
const ProductController = require("./database/controllers/ProductController");
const User_Product = require("./database/controllers/User_Product");
const AddressController = require("./database/controllers/AddressController");
const PaymentController = require("./database/controllers/PaymentController");
const FreightController = require("./database/controllers/FreightController");
const AttributeController = require("./database/controllers/AttributeController");
const UploadController = require("./database/controllers/UploadController");
const OrderController = require("./database/controllers/OrderController");

//  CRUD de usuários
routes.get("/users", midellwareauth, UserController.index);
routes.get("/show/:email", midellwareauth, UserController.show);
routes.post("/users", UserController.create);
routes.put("/users/:id", midellwareauth, UserController.update);
routes.put("/userADM/:id", midellwareauth, UserController.updateADM);
routes.delete("/users", midellwareauth, UserController.delete);
routes.delete("/userADM/:id", midellwareauth, UserController.deleteADM);

// routes of Login
routes.post("/login", login.none(), AuthController.create);
routes.post("/forgot", AuthController.forgotPassword);
routes.post("/reset/:token", AuthController.verifyToken);

// CRUD of Products

routes.get("/", ProductController.index);
routes.get("/products", ProductController.indexAllProductsUnavailable);
routes.get("/Productshow/:id", ProductController.show);
routes.post(
  "/product",
  multer(multerConfig).array("image[]"),
  midellwareauth,
  ProductController.create
);
routes.put(
  "/product/:id",
  multer(multerConfig).array("image[]"),
  midellwareauth,
  ProductController.update
);
routes.delete("/product/:id", midellwareauth, ProductController.delete);
// add attributes
routes.put("/attribute/:id", midellwareauth, ProductController.addAttributes);

// list all sales- lista todas as vendas
routes.get("/product_sold", midellwareauth, User_Product.index);

// list all sales between- lista todas as vendas entre
routes.get("/product_sold_between", midellwareauth, User_Product.indexBetween);
routes.get(
  "/product_sold_betweenCount",
  midellwareauth,
  User_Product.sumBetween
);

routes.post("/product_sold", midellwareauth, User_Product.create);

// Upload
routes.post(
  "/upload/:idProduct",
  multer(multerConfig).array("image[]"),
  UploadController.create
);
routes.get("/upload", midellwareauth, UploadController.index);
routes.delete("/upload/:id", midellwareauth, UploadController.delete);

// adiciona estados e cidades
routes.post("/teste", AddressController.addstate);

// lista estado
routes.get("/liststate", AddressController.listState);
// lista cidade por estado
routes.get("/listcity/:id", AddressController.listCity);
// cria endereco
routes.post("/address", AddressController.create);
// lista todos endereços cadastrados
routes.get("/address", AddressController.index);
// lista os enderecos de um usuario
routes.get("/address/:id", AddressController.show);
// delete
routes.delete("/address/:id", AddressController.delete);

// payment
routes.post("/purchase", PaymentController.create);

// freight
routes.post("/freight", FreightController.create);

// CRUD OF ORDERS
routes.get("/orders", midellwareauth, OrderController.index);
routes.get("/orders_send", midellwareauth, OrderController.index_send);
routes.post("/order/:id", midellwareauth, OrderController.create); // id_client
routes.put("/order/:id", midellwareauth, OrderController.update); // id_order
routes.delete("/order/:id", midellwareauth, OrderController.delete); // id_order

module.exports = routes;
