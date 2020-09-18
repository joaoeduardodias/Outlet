const express = require('express')
const crypto = require("crypto");
const Connection = require("../../database/index")

async function index(res) {
   const users = await Connection('Users').select('*')
   return res.json(users)
}

async function create(req, res) {
  const {
    name,
    email,
    password,
    whatsapp,
    cpf,
    date_birth,
    administrador,
  } = req.body;
  const id = crypto.randomBytes(6).toString('HEX');

 await Connection('Users').insert({
   name,
   email,
   password,
   whatsapp,
   cpf,
   date_birth,
   administrador,
     

  })

  return res.status(201).json({id})
}
