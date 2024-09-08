const {Router} = require('express');
const UserModel = require('../models/UserModel');
const BookModel = require('../models/BookModel');
const BookEventModel = require('../models/BookEventModel');
const UserBookModel = require('../models/UserBookModel');
const UserEventModel = require('../models/UserEventModel');
const Sequelize = require('sequelize');


const booking = Router('/booking');

booking.get('/books', async (req,res) => {
    const books = await BookModel.findAll( {where : {limit : {[Sequelize.Op.gt] : 0}}, order: Sequelize.literal('random()')});
    return res.json(books);
});

booking.post('/rent', async (req, res) => {
    const {book_id, user_id, to} = req.body;
    console.log(book_id, user_id);
    const book = await BookModel.findByPk(book_id);
    console.log(to);
    if (book.limit > 0 && book.limit !== 0) {
        book.limit -= 1;
        await book.save();
        await UserBookModel.create({book_id : book_id, user_id : user_id, to : to})
        return res.json({status : 'success'})
    }
    return res.json({status : 'failed'})
});

booking.post('/get_rent', async (req, res) => {
        const { user_id } = req.body;
        console.log(user_id)
        const userBooks = await UserBookModel.findAll({ where: { user_id : user_id } });


        const books = [];
        for (let i = 0; i < userBooks.length; i++){
            const book = await BookModel.findByPk(userBooks[i].book_id);
            books.push({id : book.id, title : book.title, image : book.image, to : userBooks[i].to});
        }

        return res.json(books);
        
    })
booking.post('/update_rent', async (req, res) => {
    const {book_id, user_id, to} = req.body;
    const book = await BookModel.findOne({where : {book_id : book_id, user_id : user_id}});
    book.to = to;
    await book.save();
    return res.json({status : 'success'});
});



booking.get('/events', async (req,res) => {
    const events = await BookEventModel.findAll();
    return res.json(events);
});

booking.post('/reg', async (req, res) => {
    const {user_id, event_id, to} = req.body;
    const isTaken = await UserEventModel.findOne({where : {user_id : user_id, event_id : event_id}});
    if (isTaken) {
        return res.json({status : 'failed'});
    }
    const event = await UserEventModel.create({user_id : user_id, event_id : event_id, to : to});
    return res.json(event);
});

booking.post('/reg_events', async (req, res) => {
    const {user_id} = req.body;
    const data = await UserEventModel.findAll({where : {user_id : user_id}});

    const events = [];
        for (let i = 0; i < data.length; i++){
            const event = await BookEventModel.findByPk(data[i].event_id);
            events.push(event);
        }
        
        return res.json(events)
});

booking.post('/level_increase', async (req, res) => {
    const {user_id, points} = req.body;
    const user = await UserModel.findByPk(user_id);
    user.level += points;
    await user.save();
    return res.json(user);
})

booking.post('/remove_book', async (req, res) => {
    const {user_id, book_id} = req.body;
    const readed = await UserBookModel.findOne({where : {user_id : user_id, book_id : book_id}});
    if (!book) {
        return res.json({status : 'failed'});
    }
    const book = await BookModel.findByPk(readed.book_id);
    book.limit += 1;
    await book.save(); 
    await readed.destroy();
    return res.json({status : 'success'});
})

booking.post('/remove_reg', async (req, res) => {
    const {user_id, event_id} = req.body;
    const event = await UserEventModel.findOne({where : {user_id : user_id, event_id : event_id}});
    if (!event) {
        return res.json({status : 'failed'});
    }
    await event.destroy();
    return res.json({status : 'success'});
});


module.exports = booking;