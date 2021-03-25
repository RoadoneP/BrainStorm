const express = require('express');
const User = require('../schemas/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt =require('jwt-then');

const router = express.Router();

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.send("No User Exists");
            res.data = null;
        }
        else {
            req.logIn(user, async (err) => {
                if (err) throw err
                const token = await jwt.sign({ id: user.id , expiration: "5m"}, process.env.SECRET);
                return res.json({
                    message: "Login successfully!",
                    token,
                    user,
                });
            });
        }
    })(req, res, next);
});

router.post('/register',(req, res) => {
    User.findOne({ username: req.body.username }, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send("User Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
            });
            await newUser.save();
            res.send("User Created");
        }
    });
});

module.exports = router;



