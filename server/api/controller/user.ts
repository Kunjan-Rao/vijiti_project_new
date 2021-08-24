import {Request,Response} from '../common/common-routing-methods'
import * as user_service from '../service/user'
export const reqister=async(req:Request,res:Response)=>{
    const status=await user_service.user_register(req.body)
    
     
}