import usermodal from "../modals/userModal"
import adminmodal from "../modals/adminModal"
import {Request,Response,jwt} from '../common/common-routing-methods'
import { verifyToken } from "../common/tokens"
import { NextFunction } from "express"
const user=async(req:Request,res:Response,next:NextFunction)=>{
   try{
     const barearToken=req.headers['authorization']
     const token=barearToken.split(' ')[1]
     const isUser =await verifyToken(token)
     if(isUser.id){   
         let _id=isUser.id
         const user=await usermodal.findOne({_id})
         next()
         return
     }else{
         res.status(400).send({error:'login error'})

     }
    
   }catch(err){
         res.status(400).send({login_error:'token not valid'})
   }
}

const admin=()=>{

}
export {user,admin}