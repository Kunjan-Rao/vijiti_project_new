import { Request,Response} from '../common/common-routing-methods'
import * as super_admin_service from '../service/super.admin'

export const add_admin_controller=async(req:Request,res:Response)=>{
    console.log(req.body)
    let isAdded=await super_admin_service.add_admin(req.body)
    if(isAdded.status==1){
        res.status(200).send({ok:"Admin Regiseter"})
    }else{
        res.status(400).send({error:`error-type ${isAdded.err}`})
       
    }

}