const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Rudra';
const fetchuser = require('../middleware/fetchuser');

router.post('/createuser',[
    body('name' , 'Enter a Valid Name').isLength({min :3}),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password' , 'Enter a Valid Password').isLength({min :5}),
], async (req,res) =>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
    
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({ success ,error : "sorry a user is already exists"})
        }
        const salt = await bycrypt.genSalt(10);
        const secPass = await bycrypt.hash(req.body.password , salt);
        user = await User.create({
            name: req.body.name,
            email:req.body.email,
            password: secPass,
        })

        const data = {user :{
            id:user.id
        }}

        const authtoken = jwt.sign(data,JWT_SECRET);
        
        //.then(user => res.json(user)).catch(err => {console.log(err)
        //res.json({error : "This Email is already Resgistered", Error_Message : err.message})
        //})
        success = true;
        res.json({success,[req.body.name] : "You Registered Successfully" , authtoken })

    }catch(error){

        console.error(error.message);
        res.status(500).send("Some Error Occurred");

    }
})

router.post('/login',[
    body('email', 'Enter a Valid Email').isEmail(),
    body('password' , 'Enter a Valid Password').exists()
], async (req,res) =>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    const {email,password} = req.body;
    try {
    
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success ,error : "Please enter the correct crediential"})
        }
    
        bycrypt.compare(password, user.password, (err, data) => {
            if (err) throw err
            if (data) {
                const data = {user :{
                    id:user.id
                }}
                const authtoken = jwt.sign(data,JWT_SECRET);
                res.status(200).json({success : true ,authtoken})
            } else {
                return res.status(400).json({success ,error : "Please enter the correct crediential"})
            }

        })


    }catch(error){

        console.error(error.message);
        res.status(500).send("Some Error Occurred");

    }
})

router.post('/getuser', fetchuser, async (req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        userId = req.user.id;
        let user = await User.findById(userId).select("-password")
        res.json({user})
    }catch(error){
        console.error(error.message);
        res.status(500).send("Some Error Occurred");

    }
})
module.exports = router;