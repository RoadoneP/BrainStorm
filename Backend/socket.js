module.exports = (server) => {

    const mongoose = require("mongoose");

    const Message = mongoose.model("Message");
    const User = mongoose.model("User");

    const jwt = require('jwt-then');
    const io = require('socket.io')(server);

    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.query.token;
            const payload = await jwt.verify(token, process.env.SECRET);
            socket.userId = payload.id;
            next();
        } catch (err) {
        }
    });

    io.on('connection', (socket) => {
        console.log("connected: " + socket.userId);

        socket.on('disconnect', () => {
            console.log("Disconnected: " + socket.userId);
        })

        socket.on("joinRoom", ({chatroomId}) => {
            socket.join(chatroomId);
            console.log(chatroomId + "님이 참여하셨습니다.");
        });

        socket.on("leaveRoom", ({chatroomId}) => {
            socket.leave(chatroomId);
            console.log(chatroomId + "님이 나가셨습니다.");
        });

        socket.on("chatroomMessage", async ({chatroomId, message}) => {
            if (message.trim().length > 0) {
                const user = await User.findOne({_id: socket.userId});
                const newMessage = new Message({
                    chatroom: chatroomId,
                    user: socket.userId,
                    message,
                });
                io.to(chatroomId).emit("newMessage", {
                    message,
                    name: user.username,
                    userId: socket.userId,
                });
                await newMessage.save();
            }
        });

    });
}