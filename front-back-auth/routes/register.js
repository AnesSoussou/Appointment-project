const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

//Register user
router.post('/',
    body('firstname', 'Firstname must contain alphabetic only').isAlpha(),
    body('lastname', 'Lastname must contain alphabetic only').isAlpha(),
    body('email' , "Please enter a valid Email").isEmail(),
    body('password', "Password should contain a minimum five characters").isLength({ min: 5 }),
    body('phone', 'Phone must contain only numbers').isNumeric(),
    body('role').isString(),
 (req,res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }
     
     User.find({email: req.body.email})
         .then(users => {
             if(users.length){
                 return res.status(400).send({ errors: [{msg: "User already exist!"}]})
             }

             let newUser = new User(req.body)
             bcrypt.genSalt(10, (err, salt) => {
                 if (err) {
                     throw err;
                 }
                 bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
                     if (err) {
                         throw err;
                     }
                    newUser.password = hashedPwd;

                    newUser.save();

                    let payload = {
                        userId: newUser._id,
                    };

                    jwt.sign(payload,process.env.SECRET_KEY, (err, token) => {
                        if (err) {
                            throw err;
                        }
                        res.send({token});
                    });
                });
             });
         });

});

module.exports = router;