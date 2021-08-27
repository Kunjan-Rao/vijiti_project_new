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
export const show_all_user_controller=async(req:Request,res:Response)=>{
   const users=await admin_service.show_all_user()
   res.status(200).send(users.users)
}

export const admin_login_controller=async(req:Request,res:Response)=>{
   const admin=await admin_service.admin_login(req.body)
   if(admin.status==1){
       let token=admin.token
       res.status(200).send({ok:'admin login successfully',token})
   }else{
      res.status(400).send({error:'inccorrect admin details'})
   }
}
export const delete_user_controller=async(req:Request,res:Response)=>{
    let _id=req.params.id
    const isDel=await admin_service.user_delete(_id)
    if(isDel.deletedCount!=0){
        res.status(200).send({ok:'User Deleted'})
    }else{
        res.status(400).send({error:'no data found'})
    }
}
