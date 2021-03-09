const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); //로그를 관리하기위한 라이브러리
const cors = require('cors');
const session = require('express-session'); //세션을 관리하기위한 미들웨어
const flash = require('connect-flash'); //일회성 메시지를 띄울 때 사용
const passport = require('passport');

const passportConfig = require('./passport/passportConfig');
const connect = require('./schemas');
require('dotenv').config();
const authRouter = require('./routes/auth');

//--------------------------End of Import-------------------------//

const app = express();
connect();
passportConfig(passport);

app.set('port', process.env.PORT || 8001 );

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
}))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true, //이것은 나중에 Https로 전환할 때 바꾸자.
        secure: false,
    }
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./passport/passportConfig')
//--------------------------End of Middleware-------------------------//


//Router
app.use('/',authRouter);
//--------------------------End of Router-------------------------//


app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 대기중');
});

