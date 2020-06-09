const mongoose=require('mongoose');
const Joi=require('joi');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
},
email:{
    type:String,
    required:true,
    minlength:5,
    maxlength:255
},
type:{
    type:String,
    required:true,
    minlength:5,
    maxlength:255
},

password:{
    type:String,
    required:true,
    minlength:10,
    maxlength:1024
}
});
function validateUser(user){
    const schema={
        name:Joi.string().required(),
        email:Joi.string().required().email(),
       type:Joi.string().required(),
        password:Joi.string().min(10).max(1024).required(),

    }
    return Joi.validate(user,schema);
};
const User=mongoose.model("User",userSchema);
exports.validate=validateUser;
exports.User=User;