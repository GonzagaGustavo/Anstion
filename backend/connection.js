const Sequelize = require("sequelize")
const sequelize = new Sequelize({
    database: "anstion",
    username: "od8f23qut6ut",
    password: "pscale_pw_KnXiTLHCMY_GXwnkyTO7b79Xj6Ci2KS4oLmfMwY_7RY",
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