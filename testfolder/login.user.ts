import {Request,Response} from 'express'
import usermodal from '../modals/userModal'
import { verifyPassword } from '../common/password'
export default  async(req:Request,res:Response)=>{
    try{
    let {email,password}=req.body
    let user=await usermodal.findOne({email}).exec(async(err,user)=>{
        if(err) throw res.send(400).send({error:`error occured: ${err}`})
        let isValid=await verifyPassword(password,user.password)
        if(isValid){
            let token=await user.genrateToken()

            res.status(200).send({success:'Login Successfully ... now you can access our api',token})
        }else{
            res.status(400).send('password incorrect... please enter correct password')
        }
   
    })
     if(user){
        
     }
     else{
         res.status(400).send('incorret email..please enter valid email address')
     }
    }catch(err){
     console.log({error:"email and password are incorrect"})
    }

}
