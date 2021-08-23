import { Request,Response } from "express";
import { setPassword} from "../server/api/common/password";
import adminModal from "../server/api/modals/adminModal";

export default async(req:Request,res:Response)=>{
    try{
        let {username,password}=req.body
        password=await setPassword(password)
        let admin:any=new adminModal({
            username,password
        })
        let token=await admin.genrateToken()

        await admin.save()
        res.status(200).send({ok:'admin registered succesfully',
    token})
       

    }catch(err){
      res.status(400).send('Somthing went to wrong with admin')
    }
}
