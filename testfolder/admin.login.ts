import { Request,Response } from "express";
import adminModal from "../modals/adminModal";
import * as bcryptjs from 'bcryptjs'


export default async(req:Request,res:Response)=>{
    try{
        let {username,password}=req.body
        let admin=await adminModal.findOne({username})
        if(admin){
            let isAdmin=await bcryptjs.compare(password,admin.password)
            if(isAdmin){
                let token=await admin.genrateToken()
                res.status(200).send({ok:'Admin login succsesfully',
              token})
                
            }
        }else{

        }
        
    }catch(err){
        res.send({error:'Something went to wrong'})

    }
}