const mongoose=require('mongoose');

const gadgetSchema=mongoose.Schema({
name:{
    type:String,
    
},
type:{
    type:String
    
},
colour:{
    type:String    
},
cost:{
    type:Number
    
},
poster:{
    type:String
    
},
description:{
    type:String
    
    
}
});
function validateGadget(gadget){
    const schema={
        name:Joi.string().required(),
        type:Joi.string().required(),
        colour:Joi.string().required(),
        cost:Joi.Number().required(),
        poster:Joi.string().required(),
        description:Joi.string().required()

    }
    return Joi.validate(gadget,schema);
};
const Gadget=mongoose.model("Gadget",gadgetSchema);

exports.validate=validateGadget;
exports.Gadget=Gadget;