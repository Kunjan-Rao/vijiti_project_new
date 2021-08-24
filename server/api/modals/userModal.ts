import { NextFunction } from 'express'
import  *  as mongoose from 'mongoose'
import user from '../interface/user'
const jwt=require('jsonwebtoken')


let UserSchema=new mongoose.Schema<user>({
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

})


let usermodal=mongoose.model('User',UserSchema)
export default usermodal