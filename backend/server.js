const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const DB = require('./connection.js')
const routeUser = require('./Login/create.js')
const routerP = require("./Perguntas/RoutesP.js")
const routerR = require("./Perguntas/RoutesR.js")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: 'true'}))

app.use(routeUser)
app.use("/perguntas", routerP)
app.use("/respostas", routerR)

app.get("/", (req, res) => {
    res.send("Esta página está reservada para um Servidor")
})
app.listen(process.env.PORT || 8000, () => console.log("Porta 8000"))