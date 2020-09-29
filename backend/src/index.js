require("dotenv-safe").config();
const express = require('express');
const cors = require('cors')
const routes = require('./routes')
const app = express()

app.use(cors())
app.use(express.json())


app.use(routes)
    // error not found

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

// tratamento de erros 
// captura todos os erros (cath all),
// estamos criando um middelware

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})



app.listen(3333)