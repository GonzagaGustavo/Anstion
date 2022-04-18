const express = require("express")
const routeUser = express.Router()

const Sequelize = require('sequelize')
const usuarios = require('./../connection.js')

routeUser.post("/createLogin", (req, res) => {
    usuarios.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
})

module.exports = routeUser