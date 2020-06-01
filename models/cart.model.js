const mongoose=require('mongoose');

const cartSchema=mongoose.Schema({
    _id:{
        type:String,
    },
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
    
    
},
productCount:{
    type:Number
    
}
});
function validateCart(cart){
    const schema={
        name:Joi.string().required(),
        type:Joi.string().required(),
        colour:Joi.string().required(),
        cost:Joi.Number().required(),
        poster:Joi.string().required(),
        description:Joi.string().required(),
        productCount:Joi.Number().required()

    }
    return Joi.validate(cart,schema);
};
const Cart=mongoose.model("Cart",cartSchema);

exports.validate=validateCart;
exports.Cart=Cart;