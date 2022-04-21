const express = require("express")
const routerR = express.Router()
const Sequelize = require("sequelize")
const sequelize = require("./../connection.js")

const respostas = sequelize.define('respostas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pergunta_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    resposta: {
        type: Sequelize.STRING,
        allowNull: false
    },
    obrigado: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})
respostas.sync()

routerR.get("/", (req, res) => {
    res.send("Server de respostas")
})
routerR.post("/getRespostas", async (req, res) => {
    console.log(req.body.id)
    const info = await respostas.findAll({
        where: {
            pergunta_id: req.body.id
        }
    })
    res.send(info)
})

module.exports = routerR