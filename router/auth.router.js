const {User} = require('../models/users.model.js');
const express=require('express');
const _=require('lodash');
const bcrypt=require('bcryptjs');
const router = express.Router();
const Joi = require('joi');
const jwt=require('jsonwebtoken');
const config=require('config');

router.post('/',async(req,res)=>{
    //check for validation
    const {error}=validate(req.body)
    if(error)
     return res.status(400).json({message:error.details[0].message});

     //check existance of user
     const user=await User.findOne({email:req.body.email});

     //if user not found send message
     if(!user)
     return res.status(400).json({success:false,message:"invalid mail id, you need to register or give the correct mail id"});
     //compare password 
     const validPassword=await bcrypt.compare(req.body.password,user.password);
     if(!validPassword)
     //return res.status(400).send("invalid email or password");
     res.status(400).json({success:false,message:"Invalid password ,please type correct password"});
     //to check the validity of id,email
     const token=jwt.sign({_id:user._id},config.get('jwtPrivateKey'));

     res.status(200).json({success:true,token:token,_id:user._id});
})

function validate(user){
    const schema={
        email:Joi.string().min(5).required(),
        password:Joi.string().min(10).max(1024).required()
    };
    return Joi.validate(user,schema);
}
module.exports=router;
// const express= require('express');
// const app=express()
//  const router=express.Router();
// module.exports = (app) => {
//     const auth = require('../controllers/auth.controller');

//     // Create a new Note
//     router.post('/', auth.post);

    
// }