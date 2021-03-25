const express = require('express');
const Chatroom = require('../schemas/chatroom');
const auth = require('../routes/middleware');

const router = express.Router();

//방 불러오기
router.get('/',auth,async (req,res,next)=>{
    try {
        const chatRooms = await Chatroom.find({});

        res.json(chatRooms);
    } catch (error){
        console.error(error)
        next(error);
    }
});

//방 만들기
router.post('/',auth,async (req, res,next)=>{
    try {
        const {name} = req.body;
        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

        const chatroomExists = await Chatroom.findOne({name});

        if (chatroomExists) throw "Chatroom with that name already exists!";

        const chatroom = new Chatroom({
            name,
        });

        await chatroom.save();

        res.json({
            message: "Chatroom created!",
        });

    }catch (error){
        console.error(error);
        next(error);
    }
});

module.exports = router;