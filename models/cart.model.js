const mongoose=require('mongoose');

const cartSchema=mongoose.Schema({
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
function validateCart(cart){
    const schema={
        name:Joi.string().required(),
        type:Joi.string().required(),
        colour:Joi.string().required(),
        cost:Joi.Number().required(),
        poster:Joi.string().required(),
        description:Joi.string().required()

    }
    return Joi.validate(cart,schema);
};
const Cart=mongoose.model("Cart",cartSchema);

exports.validate=validateCart;
exports.Cart=Cart;