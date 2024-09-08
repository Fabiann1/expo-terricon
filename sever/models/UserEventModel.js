const {Model, DataTypes, INTEGER} = require('sequelize');
const {db} = require('../services/db_init.js');

class UserEventModel extends Model {}

UserEventModel.init({
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    event_id : {
        type : DataTypes.INTEGER
    },
    user_id : {
        type : DataTypes.INTEGER
    }
    
}, {sequelize : db, modelName : 'user_event'});


module.exports = UserEventModel;
