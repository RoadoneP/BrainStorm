const mongoose= require('mongoose');

const {Schema} = mongoose;
const { Types: {ObjectId}} = Schema;

const messageSchema = new mongoose.Schema({
    chatroom: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Chatroom is required!",
        ref: "Chatroom",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: "Chatroom is required!",
        ref: "User",
    },
    message: {
        type: String,
        required: "Message is required!",
    },
});

module.exports = mongoose.model("Message", messageSchema);