const Sequelize = require("sequelize")
const sequelize = new Sequelize('Brainly', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
})

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

module.exports = usuarios