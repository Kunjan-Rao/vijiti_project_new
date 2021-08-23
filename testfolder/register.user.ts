import {Request,Response} from 'express'
import usermodal from '../modals/userModal'
import * as joi from  'joi'
import { setPassword } from '../common/password'
export default async(req:Request,res:Response)=>{
    try{
     
       let {name,email,mobileno,password}=req.body
         //createting a joi validation for our data sent by post request
       let Schema=joi.object({
           name:joi.string().required(),
           email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
           mobileno:joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
           password:joi.string().required()
         })

         //apply data to our data
         let result=Schema.validate(req.body)
         if(result.error){
             res.status(400).send(result.error.details[0].message)
             return
         }

         //add password method for  Hashing a password
        
             password=setPassword(password)
            //adding new user to the modal
            let user:any=new usermodal({
             name,email,mobileno,password
           })
          
         let token=await user.genrateToken()
          
                     
         await user.save()
         res.status(200).send({success:"Registration done  successfully"})
    }catch(err){
        res.send({error:"Data not Inserted.."})

    }

}
