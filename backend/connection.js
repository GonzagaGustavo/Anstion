const Sequelize = require("sequelize")
const sequelize = new Sequelize({
    database: "anstion",
    username: "a3gfdtnh5eeh",
    password: "pscale_pw_rKx-QeC_iP5mIkJOITHKTy8OhFYmE8zmW07tRWG0Xjc",
    host: "vrl5xi2i8byq.aws-sa-east-1-1.psdb.cloud",
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  });

module.exports = sequelize