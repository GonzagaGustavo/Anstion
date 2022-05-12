const express = require("express");
const routeUser = express.Router();
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils.js");
const sequelize = require("./../connection.js");
const jwt = require("jsonwebtoken");

const usuarios = sequelize.define("usuarios", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
usuarios.sync();

routeUser.post("/createLogin", async (req, res) => {
  const tem = await usuarios.findOne({
    where: {
      email: req.body.email,
    },
  });
  console.log(tem);
  if (tem === null) {
   usuarios.create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    res.send("Usuario Criado!");
    return;
  } else {
    res.send("Já existe uma conta com esse email!")
  }
});

routeUser.post("/verifyLogin", async (req, res) => {
  const info = await usuarios.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (info === null) {
    res.send("nouser");
  } else {
    if (bcrypt.compareSync(req.body.password, info.dataValues.password)) {
      const user = info.dataValues;
      console.log(user);
      let saves = {
        id: user.id,
        token: generateToken(user),
      };
      res.send(saves);
    } else {
      res.send("nouser");
    }
  }
});
routeUser.post("/getUser", async (req, res) => {
  const user = jwt.decode(req.body.token, process.env.JWT_SECRET);
  if (user.id != Number(req.body.id)) {
    res.send(false);
    return;
  } else {
    const info = await usuarios.findOne({
      where: {
        id: req.body.id,
        email: user.email,
      },
    });
    res.send(info);
  }
});
routeUser.post("/getUserbyID", async (req, res) => {
  const info = await usuarios.findOne({
    where: {
      id: req.body.id,
    },
  });
  console.log(info);
  res.send(info);
});

module.exports = routeUser;
