const {Model, DataTypes} = require('sequelize');
const {db} = require('../services/db_init.js');

class BookModel extends Model {}

BookModel.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    image : {
        type : DataTypes.STRING
    },
    title : {
        type : DataTypes.STRING
    },
    description : {
        type : DataTypes.TEXT
    },
    limit : {
        type : DataTypes.INTEGER,
        defaultValue : 0
    }

}, {sequelize : db, modelName : 'book'});

module.exports = BookModel;
