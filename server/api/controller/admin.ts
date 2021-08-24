import * as admin_service from '../service/admin'
import { Request,Response} from '../common/common-routing-methods'
//export regiseter controller 
export const reqister=async(req:Request,res:Response)=>{
    //passing data in user service
    const regisetr=await admin_service.user_register(req.body)
    if(regisetr.status){
        res.status(200).send({ok:'User Register Successfully'})
    }else{
        res.status(400).send({error:`error-type:${regisetr.err}`})
    }
   
}

