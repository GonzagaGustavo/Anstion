const express = require("express")
const routeUser = express.Router()
const Sequelize = require('sequelize')
const sequelize = require('./../connection.js')

const usuarios = sequelize.define('usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
usuarios.sync()

routeUser.post("/createLogin", (req, res) => {
    usuarios.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
})

routeUser.post("/verifyLogin", async (req, res) => {
    const info = await usuarios.findAll({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
    console.log(info.length)
    if(info.length == 0) {
        res.send("nouser")
    } else {
        res.send("user")
    }
})

module.exports = routeUser