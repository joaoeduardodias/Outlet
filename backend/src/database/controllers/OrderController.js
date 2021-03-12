// const Connection = require("../../database");
// const crypto = require("crypto");
// module.exports = {
//   async index(req, res) {
//     const data = await Connection("Orders");
//     return res.json(data);
//   },
//   async create(req, res, next) {
//     try {
//       const id_order = crypto.randomBytes(3).toString("HEX");

//       const { ...idsSold } = req.body;
//       const ids = JSON.stringify(idsSold);
//       await Connection("Orders").insert({
//         id_order,
//         ids_sold: ids,
//       });

//       return res.json(idsSold);
//     } catch (error) {
//       // next(error)
//       console.log(error);
//       return res.status(500).json({ message: "Error" + error });
//     }
//   },
//   async update(req, res, next) {
//     try {
//     } catch (error) {
//       next(error);
//     }
//   },
//   async delete(req, res, next) {
//     try {
//     } catch (error) {
//       next(error);
//     }
//   },
// };
