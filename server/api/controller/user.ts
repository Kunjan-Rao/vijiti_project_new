//import modules
import {Request,Response} from '../common/common-routing-methods' //common modules
import * as user_service from '../service/user'//user modal
import { global } from '../common/global'

export const login=async(req:Request,res:Response)=>{
     //passing login data into user service
     const login=await user_service.user_login(req.body)
     
     if(login.status==1){
         let token=login.token
         res.status(200).send({ok:'Login Successfully',token})
     }else{
         res.status(400).send({error:`Login error :${login.err}`})
     }
}

//export regiseter controller 
export const add_product_controller=async(req:Request,res:Response)=>{
    //passing data in user service
    const product=await user_service.add_product(req.body)
    if(product.status){
        res.status(200).send({ok:'new product added'})
    }else{
        res.status(400).send({error:`error-tyoe:${product.err}`})
    
   
 }
}


export const show_user_product_controller=async(req:Request,res:Response)=>{
    //passing login data into user service
    try{
    let user=global.user
    let id:object=user._id

 
   let response=await user_service.show_user_product(id)
   if(response.status==1){
       res.status(200).send(response.product)
   }else{
    res.status(400).send({error:`not found :${response.err}`})

   }
    }catch(err){
        res.status(400).send({error:'No data found'})
    }
 }
 export const show_single_product_controller=async(req:Request,res:Response)=>{
     let _id=req.params.id
         
     let response=await user_service.show_single_product(_id)
     let product=response.product
     console.log(response)
     if(response.status==1){
         res.status(200).send(product)
     }else{
         res.status(400).send({error:`no data found`})
     }

 }
 export const show_all_product_controller=async(req:Request,res:Response)=>{
       //passing login data into user service
       try{
          let user=global.user
          let id=user._id
          console.log(id)
        
          let response=await user_service.show_all_product(id)
          if(response.status==1){
            res.status(200).send(response.product)
         }else{
             res.status(400).send({error:`not found :${response.err}`})
          }
        }catch(err){
            res.status(400).send({error:'No data found'})
        }
     }   

export const delete_user_product_controller=async(req:Request,res:Response)=>{
    try{
        let _id:any=req.params.id

        let user=global.user
        let userId:object=user._id
        const isDeleted=await user_service.delete_user_product(_id,userId)
        // if(isDeleted.ok)
        if(isDeleted.deletedCount!=0){
            res.status(200).send({ok:'Record Deleted..'})
        }else{
            res.status(400).send({error:'Record not found'})
        }
        
          
    }catch{

    }

}
export const update_user_product_controller=async(req:Request,res:Response)=>{
    try{
        let _id:any=req.params.id
     
        let user=global.user
        let userId:object=user._id
        let record=req.body
        const isUpdated=await user_service.update_user_product(_id,userId,record)
        
        if(isUpdated.nModified!==0){
            res.status(200).send({ok:'Record Updated..'})
        }else{
            res.status(400).send({error:'Record Not Updated'})
        }
        
          
    }catch(err){

    }
 
}
export const add_comment_product_controller=async(req:Request,res:Response)=>{
    try{
     let comment=req.body.comment
     let user=global.user
     let userId=user._id
     let productId=req.params.id
     let response=await user_service.add_comment(userId,productId,comment)
     if(response.status){
         res.status(200).send({ok:'Comment Added'})
     }else{
         res.status(400).send({error:"Comment not added"})
     }


    }catch(err){
      res.status(400).send({error:err})
    }
}
   
 

    