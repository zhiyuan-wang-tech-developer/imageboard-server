const Sequelize = require('sequelize')
const database = require('../database')

// Define a user model
const UserModel = database.define(
    'user',
    {
        email: {
            type: Sequelize.STRING,
            allowNull: false    // field can not be null
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'users_table',
        timestamps: false
    }
)

module.exports = UserModel