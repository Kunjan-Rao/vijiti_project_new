import { setPassword, verifyPassword } from "../common/password"
import { genrateToken } from "../common/tokens"
import usermodal from "../modals/userModal"
import productModal from "../modals/productModal"
import product from "../interface/product";
import { global } from "../common/global";
import commentModal from "../modals/commentModal";
import * as mongoose from "mongoose";

const user_login=async({email,password})=>{
    try{ 
       let user=await usermodal.findOne({email})
       if(user){
        const isValid=await verifyPassword(password,user.password)
            if(isValid){
                let token=await genrateToken(user._id) 
                return {status:1,token}
            }
       }

    }catch(err){
        return{status:0,err}
    }
}

export const add_product=async(product:product)=>{
    try{
      let {item,category,price}=product
      let {_id}=global.user
      let savedproduct=await new productModal({
          item,category,price,userId:_id
      }) 
      await savedproduct.save()
      return {status:1} 
    }catch(err){
        return {status:0,err} 
      
    }

}

const show_user_product=async(_id:object)=>{
    try{

    let product=await productModal.find({userId:_id})
  
     return {status:1,product}
    }catch(err){
      return {status:0,err}
    }

}
const show_single_product=async(id)=>{
    try{
    //   let product=await productModal.find({_id})
    let _id=mongoose.Types.ObjectId(id);
    let product=await productModal.aggregate([
        { 
            $match: {_id:_id}             

        },
        { 
            $lookup: { 
                from: "comments", 
                localField: "_id", 
                foreignField: "ProductId", 
                as: "comment" 
            } 

        },
    ])
      return {status:1,product}
    }catch(err){ 
       return {status:0,err}

    }
}

const show_all_product=async(_id)=>{
    try{
  let userId=mongoose.Types.ObjectId(_id)
   let product=await productModal.aggregate([
        {
          $match: { userId: {$nin:[userId]}},
       
        }
    ]);
     return {status:1,product}
    }catch(err){
      return {status:0,err}
    }

}
const delete_user_product=async(_id:object,userId:object)=>{
    let isDeleted=await productModal.deleteOne({$and:[{userId,_id}]})
      return isDeleted
}

const update_user_product=async(_id:object,userId:object,record:object)=>{

    let isUpdated=await productModal.updateOne({userId,_id},record)


      return isUpdated
}



const add_comment=async(userId,productId,comment)=>{
    let newComment=new commentModal({
        userId,
        ProductId:productId,
        comment
    })
    await newComment.save()
    return {newComment,status:1}
}
export {user_login,
       show_user_product,
       show_all_product,
       delete_user_product,
       update_user_product,
       show_single_product,
       add_comment}