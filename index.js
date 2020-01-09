const express=require('express');
const mongoose=require('mongoose');
const config=require('config');
const cors=require('cors');
const app=express();
const bodyParser=require('body-parser')
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())
const userRouter=require('./router/user.router')
const authRouter=require('./router/auth.router')
const gadgetRouter=require('./router/gadget.router')

mongoose.connect(config.get("mongoConnectionString"));
mongoose.connection.on("connected",()=>{
    console.log('connected to mongodb port 27017')
})
mongoose.connection.on('error',(error)=>{
    console.log(error)
})

app.use(express.json());
app.use(cors());


app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/gadgets',gadgetRouter);
// require('./router/auth.router')(app);
// require('./router/user.router')(app);



const port=process.env.PORT||config.get('port')
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
