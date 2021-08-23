import { Request,Response } from "express"
import adminModal from "../modals/adminModal"
import * as bcryptjs from 'bcryptjs'
export default async(req:Request,res:Response)=>{
    try{
        let {username,password}=req.body
        let admin=await adminModal.find({username})
        let isAdmin=await bcryptjs.verify(admin.password,process.env.JWT_KEY)
        if(isAdmin){
             
            res.status(200).send({success:`welcome  ${admin.username}`})
        }else{
            res.status(400).send({error:"password incorrect"})
        }
    }catch(err){

    }
}