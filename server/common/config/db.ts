import * as mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/ProductDb',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true,

}).then(()=>{
    console.log('connection done to db')
}).catch(()=>{
    console.log('Something went to wrong with your connection')
})

