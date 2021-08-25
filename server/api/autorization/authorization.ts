import usermodal from "../modals/userModal"
import adminmodal from "../modals/adminModal"
import {Request,Response} from '../common/common-routing-methods'
import { verifyToken } from "../common/tokens"
import { NextFunction } from "express"
import { global } from "../common/global"
const user=async(req:Request,res:Response,next:NextFunction)=>{
   try{
     const barearToken=req.headers['authorization']
     const token=barearToken.split(' ')[1]
     const isUser =await verifyToken(token)
     if(isUser.id){   
         let _id=isUser.id
         const user=await usermodal.findOne({_id})
         global.user=user
         next()
         return
     }else{
         res.status(400).send({error:'make sure you are logged in'})

     }
    
   }catch(err){
         res.status(400).send({login_error:'token not valid'})
   }
}
//admin authorization
const admin=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const barearToken=req.headers['authorization']
        const token=barearToken.split(' ')[1]
        const isAdmin =await verifyToken(token)
        if(isAdmin.id){   
            let _id=isAdmin.id
            const Admin=await adminmodal.findOne({_id})
            if(Admin.role==0){
              next()
              return
            }
        }else{
            res.status(400).send({error:'make sure you are admin'})
   
        }
       
      }catch(err){
            res.status(400).send({admin_error:'token not valid'})
      }

}
//super admin authorization
const superadmin=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const barearToken=req.headers['authorization']
        const token=barearToken.split(' ')[1]
        const isAdmin =await verifyToken(token)
        if(isAdmin.id){   
            let _id=isAdmin.id
            const Admin=await adminmodal.findOne({_id})
            if(Admin.role==1){
                next()
                return
              }
        }else{
            res.status(400).send({error:'make sure you are super admin'})
   
        }
       
      }catch(err){
            res.status(400).send({admin_error:'token not valid'})
      }

}
export {user,admin,superadmin}