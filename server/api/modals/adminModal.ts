import * as mongoose from 'mongoose'
import {NextFunction} from 'express'
import * as jwt from 'jsonwebtoken'
import admin from '../interface/admin'

let adminSchema=new mongoose.Schema<admin>({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        enum:[0,1],
        requirec:true
    },
    issuDate:{
        type:Date,
        default:new Date().getDate()
    }
})
adminSchema.methods.genrateToken=async function(next:NextFunction){
    try{
        
          let {_id}=this
          let token:string=await jwt.sign(`${new Date().getDate}_${_id}`,process.env.JWT_KEY)
          let data=this
        if(this.isModified('username')){
          data['token']=token
          await data.save()
       
        }
    
        return token

    }catch(err){
    console.log(`somethig went to wrong ${err}`)
    }

}

let adminModal=mongoose.model('Admin',adminSchema)
export default adminModal