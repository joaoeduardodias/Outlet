const crypto = require("crypto");
const Connection = require("../../database");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(next, res) {
    try {
      const data = await Connection("Products")
      .select(
        "Products.id",
        "Products.name",
        "Images.url",
        "Images.id_product",
        "description",
        "price",
        "amount",
        "available"
        )
        .leftJoin('Images', 'Images.id_product', ' Products.id') 

       let products = []
       data.map((item) =>{
         products = item
         products['url_new']= item.url

       })
       return res.json(products)

    //   let product = {
    //     id: 0,
    //     name: "",
    //     description: "",
    //     price: 0,
    //     amount: 0,
    //     available: 1,
    //     images: [],
    //   };
    //   data.map((item, index) => {
    //     product.id = data[index].id;
    //     product.name = data[index].name;
    //     product.description = data[index].description;
    //     product.price = data[index].price;
    //     product.amount = data[index].amount;
    //     product.available = data[index].available;
    //     if (item.id === item.id_product) {
    //         product.images.push(item.url);
    //       }
         
          // console.log(teste);

    //   });
      
    return res.json(posts).send()
      

    } catch (error) {
      // next(error);
      console.log(error);
    }
  },
  async create(req, res, next) {
    try {
      let adm = false;
      const [, token] = req.headers.authorization.split(" ");
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (decoded.administrador != 0) {
          return (adm = true);
        }
      });
      if (adm === false) {
        return res.status(401).json({ message: "User is not adm" });
      }
      const { name, price, amount, description } = req.body;
      const verifyName = await Connection("Products")
        .select("name")
        .where({ name })
        .first();
      if (verifyName)
        return res.json({
          message: "There is already a product with that name",
        });

      const id = crypto.randomBytes(3).toString("HEX");

      await Connection("Products").insert({
        id,
        name,
        price,
        amount,
        description,
      });

      return res.status(201).send();
    } catch (error) {
      // next(error)
      console.log(error);
    }
  },
  async update(req, res, next) {
    try {
      let adm = false;
      const [, token] = req.headers.authorization.split(" ");
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (decoded.administrador != 0) {
          return (adm = true);
        }
      });
      if (adm === false) {
        return res.status(401).json({ message: "User is not adm" });
      }
      const { id } = req.params;
      const { name, price, description, amount, available } = req.body;
      await Connection("Products")
        .update({
          name,
          price,
          description,
          amount,
          available,
        })
        .where({ id });

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    try {
      let adm = false;
      const [, token] = req.headers.authorization.split(" ");
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        if (decoded.administrador != 0) {
          return (adm = true);
        }
      });
      if (adm === false) {
        return res.status(401).json({ message: "User is not adm" });
      }
      const { id } = req.params;

      await Connection("Products").where({ id }).del();
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
