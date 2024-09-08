const {Model, DataTypes} = require('sequelize');
const {db} = require('../services/db_init.js');

class UserBookModel extends Model {}

UserBookModel.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    book_id : {
        type : DataTypes.INTEGER
    },
    user_id : {
        type : DataTypes.INTEGER
    },
    to : {
        type : DataTypes.STRING
    }
}, {sequelize : db, modelName : 'user_book'});

module.exports = UserBookModel;
