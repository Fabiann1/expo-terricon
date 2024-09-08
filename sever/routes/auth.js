const { Router } = require('express')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel');
require('dotenv').config();

const auth = Router('/api');

auth.get('/', (req, res) => {
    return res.send('Connected!')
})

auth.post('/register', async (req, res, next) => {
    try {
        const {password, first_name, last_name, email} = req.body;
        if ( !email || !first_name || !last_name || !password) {return res.status(401).json({message : 'Неправильный ввод!'})}
        const userExist = await UserModel.findOne({where :  {email : email}});
        if (userExist) {return res.status(401).json({message : 'Пользователь существует!'})}
        const user = await UserModel.create({first_name : first_name, last_name : last_name, email : email, password : password});
        const token = jwt.sign({id : user.id}, process.env.JWT_TOKEN || 'secret', {expiresIn : '1h'});
        res.cookie('token', token, {maxAge : 1000 * 60 * 60});
        return res.status(201).json({message : 'Успешно зашёл!', status : true,
            user : {id : user.id, last_name : user.last_name, first_name : user.first_name, email : user.email, level : user.level},
             token : token})
    } catch (e){
        return next();
    }
});

auth.post('/login', async(req, res, next) => {
    try {
        const { password, email } = req.body;
        console.log(password, email);
        if ( !email || !password) {return res.status(401).json({message : 'Неправильный ввод!'})}
        const user = await UserModel.findOne({where :  {email : email}});
        if (!user){
            return res.status(401).json({message : 'Пользователь не найден!', status : false})
        }
        if (password !== user.password) {
            return res.status(401).json({message : 'Пароль не совпадает!', status : false})
        }
        const token = jwt.sign({id : user.id}, process.env.JWT_TOKEN || 'secret', {expiresIn : '1h'});
        res.cookie('token', token, {maxAge : 1000 * 60 * 60});
        return res.status(201).json({message : 'Успешно зашёл!', status : true,
            user : {id : user.id, last_name : user.last_name, first_name : user.first_name, email : user.email, level : user.level},
             token : token})
    } catch (e) {
        console.log(e);
        return next();
    }
});

auth.get('/authenticate', async(req, res, next)=>{
    try {
        const token = req.cookies?.token;
        if (!token) {return res.status(401).json({message : 'Пользователь не авторизован!'})}
        const token_decode = jwt.verify(token, process.env.JWT_TOKEN || 'secret');
        const {id} = token_decode;
        const user = UserModel.findByPk(id);
        if (!user) {
            res.clearCookie();
            return res.status(401).json({message : 'Пользователь не найду!'})}
        return res.status(201).json({message : 'Пользователь авторизован!', token : token});
    } catch (e){
        res.json({message : 'Ошибка', error : e});
        return next();
    }
});

module.exports = auth;