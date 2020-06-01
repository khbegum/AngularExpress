const mongoose=require('mongoose');

const gadgetSchema=mongoose.Schema({
name:{
    type:String,
    required:true
    
},
type:{
    type:String,
    required:true
    
},
colour:{
    type:String ,
    required:true  
},
cost:{
    type:Number,
    required:true
    
},
poster:{
    type:String ,
    required:true
    
},
description:{
    type:String ,
    required:true
    
    
},
productCount:{
    type:Number ,
    required:true
    
    
}
});
function validateGadget(gadget){
    const schema={
        name:Joi.string().required(),
        type:Joi.string().required(),
        colour:Joi.string().required(),
        cost:Joi.Number().required(),
        poster:Joi.string().required(),
        description:Joi.string().required(),
        productCount:Joi.Number().required()
    }
    return Joi.validate(gadget,schema);
};
const Gadget=mongoose.model("Gadget",gadgetSchema);

exports.validate=validateGadget;
exports.Gadget=Gadget;