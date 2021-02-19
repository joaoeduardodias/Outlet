const crypto = require("crypto");
const Connection = require("../../database");
const jwt = require("jsonwebtoken");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

module.exports = {

    async indexAllProductsUnavailable(next, res) {
        try {
            const data = await Connection('Products')
                .select("id", "name")
                .where('available', false)
            return res.json(data)
        } catch (error) {
            console.log(error)
        }
    },


    async index(next, res) {
        try {
            const data = await Connection("Products")
                .select(
                    "Products.id",
                    "Products.name",
                    "description",
                    "price",
                    "amount",
                    "available",
                    "weight",
                    "lenght",
                    "width",
                    "height",
                    // Connection.raw(`array_agg(attr.type) as type_attribute`),
                    // Connection.raw(`array_to_json(array_agg(option_one)) option_one`),
                    // Connection.raw(`array_to_json(array_agg(option_two)) option_two`),
                    // Connection.raw(`array_to_json(array_agg(option_three)) option_three`),
                    // Connection.raw(`array_to_json(array_agg(option_for)) option_for`),


                    Connection.raw(`array_to_string(ARRAY_AGG(url), ',') urls`),
                    Connection.raw(`array_to_string(ARRAY_AGG(id_image), ',') ids`)
                )

            // .join("attributes as attr", "Products.id", "attr.id_product") // precisa ser independente do propximo join
            .leftJoin("Images", "Products.id", "Images.id_product") // precisa retornar 3
                .groupBy("Products.id")
                .orderBy("Products.created_at", "desc");

            return res.json(data);
        } catch (error) {
            // next(error);
            console.log(error);
        }
    },
    async show(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Connection("Products")
                .select(
                    "Products.id",
                    "Products.name",
                    "description",
                    "price",
                    "amount",
                    "available",
                    "weight",
                    "lenght",
                    "width",
                    "height",
                    // Connection.raw(`array_agg(attr.type) as type_attribute`),
                    // Connection.raw(`array_to_json(array_agg(option_one)) option_one`),
                    // Connection.raw(`array_to_json(array_agg(option_two)) option_two`),
                    // Connection.raw(`array_to_json(array_agg(option_three)) option_three`),
                    // Connection.raw(`array_to_json(array_agg(option_for)) option_for`),


                    Connection.raw(`ARRAY_AGG(url) as images`),
                    Connection.raw(`ARRAY_AGG(id_image) as idsImages`)
                )

            // .join("attributes as attr", "Products.id", "attr.id_product") // precisa ser independente do propximo join
            .leftJoin("Images", "Products.id", "Images.id_product") // precisa retornar 3
                .groupBy("Products.id")
                .where("Products.id", id)
                .first();
            if (!product) {
                return res.json({ message: "Not existe is product" });
            }


            return res.json(product);
        } catch (error) {
            next(error);
        }
    },
    async create(req, res, next) {
        let adm = false;
        const [, token] = req.headers.authorization.split(" ");
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
            if (decoded.administrador != 0) {
                return (adm = true);
            }
        });
        if (adm === false) {
            return res.status(401).json({ message: "User is not adm" });
        }
        const {
            name,
            price,
            amount,
            description,
            weight,
            lenght,
            width,
            height,
            type_attribute,
            option_one,
            option_two,
            option_three,
            option_for,
        } = req.body;


        if (!name ||
            !price ||
            !amount ||
            !description ||
            !weight ||
            !lenght ||
            !width ||
            !height

        ) {
            res.json({ message: "value missing body" });
        } else {
            const verifyName = await Connection("Products").select("name").where({ name }).first();
            if (verifyName)
                return res.json({ message: "There is already a product with that name" });

            const id = crypto.randomBytes(3).toString("HEX");
            const id_attribute = crypto.randomBytes(3).toString("HEX");


            Connection.transaction(function(trx) {
                    Connection('Products')
                        .transacting(trx)
                        .insert({
                            id,
                            name,
                            price,
                            amount,
                            description,
                            weight,
                            lenght,
                            width,
                            height,
                        })
                        .then(function() {
                            return Connection('attributes')
                                .transacting(trx)
                                .insert({
                                    id: id_attribute,
                                    type: type_attribute,
                                    option_one,
                                    option_two,
                                    option_three,
                                    option_for,
                                    id_product: id,
                                })
                        })
                        .then(function() {

                            return req.files.map(async(file) => {
                                const idImage = crypto.randomBytes(3).toString("HEX");
                                let { originalname: name, size, key, location: url = "" } = file;
                                if (url === "") {
                                    url = `${process.env.APP_URL}/files/${key}`;
                                }
                                await Connection("Images").insert({
                                    id_image: idImage,
                                    name,
                                    size,
                                    key,
                                    url,
                                    id_product: id,
                                });

                            });

                        })
                        .then(trx.commit)
                        .catch(trx.rollback);
                })
                .then(function() {
                    return res.status(201).json({ message: "create", id });
                })
                .catch(function(err) {
                    console.error(err);
                });

        }
    },
    async update(req, res, next) {
        try {
            let adm = false;
            const [, token] = req.headers.authorization.split(" ");
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (decoded.administrador != 0) {
                    return (adm = true);
                }
            });
            if (adm === false) {
                return res.status(401).json({ message: "User is not adm" });
            }
            const { id } = req.params;
            const {
                name,
                price,
                amount,
                description,
                weight,
                lenght,
                width,
                height,
                available,
            } = req.body;
            await Connection("Products")
                .update({
                    name,
                    price,
                    description,
                    amount,
                    available,
                    weight,
                    lenght,
                    width,
                    height,
                })
                .where({ id });

            return res.status(200).json({ message: "succcess" }).send();
        } catch (error) {
            next(error);
        }
    },
    async delete(req, res, next) {
        try {
            let adm = false;
            const [, token] = req.headers.authorization.split(" ");
            jwt.verify(token, process.env.SECRET, function(err, decoded) {
                if (decoded.administrador != 0) {
                    return (adm = true);
                }
            });
            if (adm === false) {
                return res.status(401).json({ message: "User is not adm" });
            }
            const s3 = new aws.S3();
            const { id } = req.params;
            const key = await Connection("Images")
                .select("key")
                .where("id_product", id);
            key.forEach((element) => {
                if (process.env.STORAGE_TYPE === "s3") {
                    s3.deleteObject({
                        Bucket: process.env.BUCKET_NAME,
                        Key: element.key,
                    }).promise();
                } else {
                    promisify(fs.unlink)(
                        path.resolve(
                            __dirname,
                            "..",
                            "..",
                            "..",
                            "tmp",
                            "uploads",
                            element.key
                        )
                    );
                }
            });
            await Connection("Images").where("id_product", id).del();
            await Connection("attributes").where("id_product", id).del();

            await Connection("Products").where({ id }).del();
            return res.json({ message: "success" }).send();
        } catch (error) {
            next(error);
        }
    },
};