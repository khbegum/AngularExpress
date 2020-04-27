const {User,validate}=require('../models/users.model');
const auth=require('../middleware/auth.middleware.js')
const express= require('express');
const app=express()
const _=require('lodash');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const config=require('config');
const router=express.Router();
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

router.get('/',auth,async(req,res)=>{
    const user=await User.find().select("-password");
    res.send(user)
})
router.get('/:_id',async(req,res)=>{
    const user=await User.findById({_id:req.params._id}).select("-password");
    res.send(user)
})
router.post('/',async(req,res)=>{
    //check for validation error
    // const {error}=validate(req.body)
    // if(error)
    // return res.status(400).send(error.details[0].message);
    //check for existence
    
    let user=await User.findOne({email:req.body.email});
    if(user)
    return res.status(400).send("User already registered");
    //create new User
    let newUser=new User(_.pick(req.body,['name','email','password']))
    const salt=await bcrypt.genSalt(10);
    newUser.password=await bcrypt.hash(newUser.password,salt)
    await newUser.save();
    const token=jwt.sign({_id:newUser._id,email:newUser.email},config.get('jwtPrivateKey'))
    res.header('x-auth-token',token)
    .status(200).send((_.pick(newUser,['_id','name','email'])));
})
module.exports=router
// const express= require('express');
//  const router=express.Router();
// const auth=require('../middleware/auth.middleware.js')
// module.exports = (app=express()) => {
   
    
//     const user = require('../controllers/user.controller');

    

//     // Retrieve all Notes
//     app.get('/api/users/',auth,user.get);

//     // Retrieve a single Note with noteId
//     app.get('api/users/:_id', user.getById);

//     //Post user
//     app.post('/api/users/',user.post)
// }