//import modules
import {Request,Response} from '../common/common-routing-methods' //common modules
import * as user_service from '../service/user'//user modal
//export regiseter controller 
export const reqister=async(req:Request,res:Response)=>{
    //passing data in user service
    const regisetr=await user_service.user_register(req.body)
    if(regisetr.status){
        res.status(200).send({ok:'User Register Successfully'})
    }else{
        res.status(400).send({error:`error-tyoe:${regisetr.err}`})
    }
   
}
export const login=async(req:Request,res:Response)=>{
     //passing login data into user service
     const login=await user_service.user_login(req.body)
     
     if(login.status){
         let token=login.token
         res.status(200).send({ok:'Login Successfully',token})
     }else{
         res.status(400).send({error:`Login error :${login.err}`})
     }
}