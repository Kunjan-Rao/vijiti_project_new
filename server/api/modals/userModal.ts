import { NextFunction } from 'express'
import  *  as mongoose from 'mongoose'
const jwt=require('jsonwebtoken')

let UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileno:{
       type:String,
       required:true
    },
    password:{
        type:String,
        required:true
    },
   token:{
       type:String,
       default:null
   }

})
UserSchema.methods.genrateToken=async function(next:NextFunction){
    try{
        let {_id}=this
        let token:string=await jwt.sign(`${new Date().getDate}_${_id}`,process.env.JWT_KEY)
        let data=this
        if(this.isModified('email')){
        data['token']=token
        await data.save()        
        }
    
        return token

    }catch(err){
    console.log(`somethig went to wrong ${err}`)
    }

}

let usermodal=mongoose.model('User',UserSchema)
export default usermodal