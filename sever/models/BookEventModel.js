const {Model, DataTypes} = require('sequelize');
const {db} = require('../services/db_init.js');

class BookEventModel extends Model {}

BookEventModel.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : DataTypes.STRING 
    },
    description : {
        type : DataTypes.TEXT
    },
    from : {
        type : DataTypes.STRING,
    },
    to : {
        type : DataTypes.STRING
    }
    
}, {sequelize : db, modelName : 'book_event'});


module.exports = BookEventModel;
