const {Model, DataTypes} = require('sequelize');
const {db} = require('../services/db_init.js');

class UserModel extends Model {}

UserModel.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    first_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    last_name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    level : {
        type : DataTypes.INTEGER,
        defaultValue : 0,
    }
}, {sequelize : db, modelName : 'user'});

module.exports = UserModel;

