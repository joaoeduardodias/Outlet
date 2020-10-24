const crypto = require("crypto");
const Connection = require("../../database");
const aws = require('aws-sdk')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
module.exports = {



    async create(req, res, next) {
        try {
            const { idProduct } = req.params
            const id = crypto.randomBytes(3).toString("HEX");
            let { originalname: name, size, key, location: url = "" } = req.file;
            if (url === '') {
                url = `${process.env.APP_URL}/files/${key}`
            }
            await Connection("Images").insert({
                id,
                name,
                size,
                key,
                url: url,
                id_product: idProduct,
            });
            return res.send()
        } catch (error) {
            next(error)
        }

    },

    async index(next, res) {
        try {
            const data = await Connection('Images')
            return res.json(data).send()
        } catch (error) {
            next(error)
        }
    },
    async delete(req, res, next) {
        try {
            const s3 = new aws.S3();

            const { id } = req.params
            const { key } = await Connection('Images')
                .select('key')
                .where({ id })
                .first();
            await Connection('Images').where({ id }).del()


            if (process.env.STORAGE_TYPE === 's3') {
                s3.deleteObject({
                    Bucket: process.env.BUCKET_NAME,
                    Key: key
                }).promise()
                return res.status(204).send()

            } else {
                promisify(fs.unlink)(
                    path.join(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', key))
                )
            }
            return res.status(204).send()
        } catch (error) {
            next(error)
        }
    }


}