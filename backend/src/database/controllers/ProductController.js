const crypto = require("crypto");
const Connection = require("../../database");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(next, res) {
    try {
      const data = await Connection("Products").select(
        "id",
        "name",
        "description",
        "price",
        "amount",
        "available"
      );
      return res.json(data).send();
    } catch (error) {
      next(error);
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
  async upload(req, res, next) {
    try {
        const {idProduct} = req.params
        const id = crypto.randomBytes(3).toString("HEX");
        const { originalname: nameImg, size, filename: key } = req.file;
    
        await Connection("Images").insert({
          id,
          name: nameImg,
          size,
          key,
          url: "",
          id_product: idProduct,
        });
        return res.send()
    } catch (error) {
        next(error)
    }
   
  },

  async indexIMG (req,res,next) {
      try {
          const data = await Connection('Images')
          return res.json(data)
      } catch (error) {
          next(error)
        console.log(error);
      }
  },
  async deleteIMG(req, res,next){
      try {
          const {id} = req.params
          await Connection('Images').where({id}).del()
          return res.status(204).send()
      } catch (error) {
          next(error)
      }
  }
};
