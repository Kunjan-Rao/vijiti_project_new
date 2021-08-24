import {Request,Response} from '../common/common-routing-methods'
import * as user_service from '../service/user'
export const reqister=async(req:Request,res:Response)=>{
    console.log(req.body)
    const regisetr=await user_service.user_register(req.body)
    if(regisetr.status){
        res.status(200).send({ok:'User Register Successfully'})
    }else{
        res.status(400).send({error:`error-tyoe:${regisetr.err}`})
    }
    
     
}