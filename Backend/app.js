const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session'); //세션을 관리하기위한 미들웨어
const flash = require('connect-flash'); //일회성 메시지를 띄울 때 사용
const passport = require('passport');

const passportConfig = require('./passport/passportConfig');
const connect = require('./schemas');
require('dotenv').config();
const authRouter = require('./routes/auth');
const chatRoom = require('./routes/chatroom');
const Socket = require('./socket');

//--------------------------End of Import-------------------------//

const app = express();
connect();
passportConfig(passport);

app.set('port', process.env.PORT || 8001 );

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, //이것은 나중에 Https로 전환할 때 바꾸자.
        secure: false,
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//--------------------------End of Middleware-------------------------//


//Router
app.use('/auth',authRouter);
app.use('/chatroom',chatRoom);

//--------------------------End of Router-------------------------//


const server = app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 대기중');
});

//------------------------socket.io-------------------------------//

Socket(server);


