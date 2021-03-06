const {User} = require('../models/users.model');
const express=require('express');
 const _=require('lodash');
 const bcrypt=require('bcryptjs');
 const router = express.Router();
 const Joi = require('joi');
 const jwt=require('jsonwebtoken');
 const config=require('config');
// Create and Save a new Note
exports.post = async(req, res) => {

//check for validation
const {error}=validate(req.body)
if(error)
 return res.status(400).send(error.details[0].message);

 //check existance of user
 const user=await User.findOne({email:req.body.email});
 
 //if user not found send message
 if(!user)
 return res.status(400).send("invalid name or password");
 //compare password 
 const validPassword=await bcrypt.compare(req.body.password,user.password);
 if(!validPassword)
 return res.status(400).send("invalid email or password");
 //to check the validity of id,email
 const token=jwt.sign({_id:user._id},config.get('jwtPrivateKey'));
 res.status(200).json({success:true,token:token,_id:user._id});
 }
 function validate(user){
    const schema={
        email:Joi.string().min(5).required(),
        password:Joi.string().min(5).max(1024).required()
    };
    return Joi.validate(user,schema);
}