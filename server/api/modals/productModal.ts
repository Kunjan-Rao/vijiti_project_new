import * as  mongoose from "mongoose";
import product from '../interface/product'
const productSchema=new mongoose.Schema<product>({
    item:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    price:{
         type:Number,
         required:true

    },
    issuDate:{
     type:Date,
     default:new Date().getDate(),
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    }
})

const productModal=mongoose.model('Product',productSchema)
export default productModal 
