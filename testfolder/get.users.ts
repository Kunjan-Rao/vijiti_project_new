import {Request,Response} from 'express'
import usermodal from '../modals/userModal'

export default async(req:Request,res:Response)=>{
    try{
         let users=await usermodal.find({},{password:0})
         res.status(200).send(users)
    }catch(err){
        res.send({error:"Users ot found.."})

    }

}
