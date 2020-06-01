const express=require('express');
const Joi=require('joi')
const router=express.Router();
const {Cart}=require('../models/cart.model');
const {Gadget}=require('../models/gadget.model')

router.get('/',(req,res)=>{
    
    Cart.find((err,result)=>{
        if(err)
         res.status(404).send(err);
         else
         res.status(200).send(result)
    })
})
router.get('/:id',(req,res)=>{
    
    Cart.findById({_id:req.params.id},(err,result)=>{
        if(err)
         res.status(404).send(err);
         else
         res.status(200).send(result)
    })
    })
    // function validateRestaurant(restaurant){
    //     const schema={
    //         id:Joi.number().required(),
    //         name:Joi.string().min(3).required(),
    //         type:Joi.string().required(),
    //         address:Joi.string().required(),
    //         contactno:Joi.number().required()
            


    //     };
    //     return Joi.validate(restaurant,schema)
    // }
        router.post('/',async(req,res)=>{
           
            // const result=validateRestaurant(req.body)
            // if(result.error){
            //     return res.status(404).send(result.error.details[0].message);
            // }
        
            
            let newCart=new Cart({
                _id:req.body._id,
                name:req.body.name,
                type:req.body.type,
                colour:req.body.colour,
                cost:req.body.cost,
                poster:req.body.poster,
                description:req.body.description,
                productCount:1
            })
    
          
            {
                newCart.save((err,result)=>{
                if(err) console.log(err);
                else{                     
                    res.status(200).send(result);
                                                            
                       
                }  
                
            })
        }
    
            
        })
        router.delete('/:id',(req,res)=>{
            
            Cart.findByIdAndDelete({_id:req.params.id},(err,result)=>{
                if(err)
                 res.status(404).send(err);
                 else{
                    res.status(200).send(result)}
            })
            
            
        })
        router.put('/:id',(req,res)=>{
            
            Cart.findOneAndUpdate({_id:req.params.id},{$set:{name:req.body.name,type:req.body.type,colour:req.body.colour,cost:req.body.cost,poster:req.body.poster,description:req.body.description,productCount:req.body.productCount}},
                (err,result)=>{
                    if(err)
                    res.status(404).send(err);
                 else{
                     res.status(200).send(result)}
                })
        })
    


    module.exports=router