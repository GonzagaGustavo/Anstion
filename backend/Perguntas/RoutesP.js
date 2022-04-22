const express = require("express")
const routerP = express.Router()
const Sequelize = require("sequelize")
const sequelize = require("./../connection.js")

const perguntas = sequelize.define('perguntas', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pergunta: {
        type: Sequelize.STRING,
        max: 2000,
        allowNull: false
    }
})
perguntas.sync()

routerP.get("/", (req, res) => {
    res.send("Server perguntas")
})
routerP.post("/create", async (req, res) => {
    await perguntas.create({
        user_id: req.body.user_id,
        pergunta: req.body.pergunta,
    })
    res.send("Pergunta criada!")
})
routerP.get("/getQuestions", async (req, res) => {
    const p = await perguntas.findAll({})
    res.send(p)
    console.log(p)
})
routerP.post("/getOneQuestion", async (req, res) => {
    const p = await perguntas.findAll({
        where: {
            id: req.body.id
        }
    })
    res.send(p)
})

module.exports = routerP