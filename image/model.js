const Sequelize = require('sequelize')
const database = require('../database')

// Define an image model
const ImageModel = database.define(
    'image',
    {
        title: Sequelize.STRING,
        url: Sequelize.STRING
    },
    {
        tableName: 'images_table'
    }
)

module.exports = ImageModel