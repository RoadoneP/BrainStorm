const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

router.post("/login",(req, res) => {
    console.log(req.body);
})

router.post("/register",(req, res) => {
    User.findOne({username: req.body.username},async (err,doc)=>{
        if(err) throw err;
        if(doc) res.send("User Already Exists");
        if(!doc){
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
            });
            await newUser.save();
            res.send("User Created");
        }
    })
})

router.get("/user",(req, res) => {

})

module.exports = router;