const express = require("express")
const routeUser = express.Router()
const Sequelize = require('sequelize')
const generateToken = require("../utils.js")
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
    const info = await usuarios.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
    console.log(info)
    if(info === null) {
        res.send("nouser")
    } else {
        const user = info.dataValues
        console.log(user)
        let saves = {
            id: user.id,
            token: generateToken(user)
        }
        res.send(saves)
    }
})
routeUser.post("/getUser", async (req, res) => {
    const info = await usuarios.findOne({
        where: {
            id: req.body.id,
            email: req.body.email
        }
    })
    console.log(info)
    res.send(info)
})

module.exports = routeUser