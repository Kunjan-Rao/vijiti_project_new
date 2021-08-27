import { setPassword, verifyPassword } from "../common/password"
import { genrateToken } from "../common/tokens"
import usermodal from "../modals/userModal"
import productModal from "../modals/productModal"
import product from "../interface/product";
import { global } from "../common/global";
import commentModal from "../modals/commentModal";
import * as mongoose from "mongoose";
import replyModal from "../modals/replymodal";
//user login service
const user_login=async({email,password})=>{
    try{ 
       let user=await usermodal.findOne({email})
       if(user){
         const isValid=await verifyPassword(password,user.password)
             if(isValid){
                 let token=await genrateToken(user._id) 
                 return {status:1,token}
             }else{
                 return {status:0}
             }
       }
       return{status:0,err:'User no found'}

    }catch(err){
        return{status:0,err}
    }
}
//add product servcie
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
//display user specefic product
const show_user_product=async(_id:object)=>{
    try{
        // let product=await productModal.find({userId:_id})
        let product=await productModal.aggregate([ 
            {
                $match:{userId:_id}
            },
            { $lookup:{ 
                from:'comments',
                localField:'_id',
                foreignField:'ProductId',
                as:'comment'  
                
               }
            },
            {$unwind:{path:'$comment',preserveNullAndEmptyArrays:true}},
       
            {$lookup:{ 
                from:'users',
                localField:'comment.userId',
                foreignField:'_id',
                as:'comment.user'  
                
               }
       
            },
             {$unwind:{path:'$comment.user',preserveNullAndEmptyArrays:true}},
             { $lookup:{ 
                from:'replies',
                localField:'comment._id',
                foreignField:'commentId',
                as:'comment.reply'  
                
               }
            },
             {$project: {
                'comment.ProductId':0,
                'comment.userId':0,
                'comment.__v':0,
                'comment.user._id':0,
                'comment.user.password':0,
                'comment.user.mobileno':0,
                'comment.user.email':0,
                 'comment.user.__v':0,
                 'comment.reply.productId':0,
                 'comment.reply.commentId':0,
            }
            
               
           },
           {$group: {
            _id:"$_id",
            item: { $first: "$item" },
            category: { $first: "$category" },
            price: { $first: "$price" },
            comment:{$push: "$comment"},
             
             }
             
            },
            
        ])
        return {status:1,product}
    }catch(err){
         return {status:0,err}
    }

}
//display single product
const show_single_product=async(id)=>{
    try{
    //   let product=await productModal.find({_id})
    let _id=mongoose.Types.ObjectId(id);
    console.log(_id)
    let product=await productModal.aggregate([ 
        {
            $match:{_id}
        },
        { $lookup:{ 
            from:'comments',
            localField:'_id',
            foreignField:'ProductId',
            as:'comment'  
            
           }
        },
        {$unwind:{path:'$comment',preserveNullAndEmptyArrays:true}},
   
        {$lookup:{ 
            from:'users',
            localField:'comment.userId',
            foreignField:'_id',
            as:'comment.user'  
            
           }
   
        },
         {$unwind:{path:'$comment.user',preserveNullAndEmptyArrays:true}},
         { $lookup:{ 
            from:'replies',
            localField:'comment._id',
            foreignField:'commentId',
            as:'comment.reply'  
            
           }
        },
         {$project: {
            'comment.ProductId':0,
            'comment.userId':0,
            'comment.__v':0,
            'comment.user._id':0,
            'comment.user.password':0,
            'comment.user.mobileno':0,
            'comment.user.email':0,
             'comment.user.__v':0,
             'comment.reply.productId':0,
             'comment.reply.commentId':0,
        }
        
           
       },
       {$group: {
        _id:"$_id",
        item: { $first: "$item" },
        category: { $first: "$category" },
        price: { $first: "$price" },
        comment:{$push: "$comment"},
         
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



const add_comment=async(userid,productId,comment)=>{
    let userId=mongoose.Types.ObjectId(userid)
    let ProductId=mongoose.Types.ObjectId(productId)
    let isProductUser=await productModal.aggregate([
        {
            $match:{_id:ProductId,userId}
        },
        {
            $project:{userId:1}
        }
     ])
    
     
    if(isProductUser.length!=0){
        return {status:0,error:'you can not comment on own product'}
    }
    let newComment=new commentModal({
        userId,
        ProductId,
        comment
    })
    await newComment.save()
    return {newComment,status:1}
}

const add_comment_reply=async(productId,commentId,msg)=>{
    let cid=mongoose.Types.ObjectId(commentId)
    let pid=mongoose.Types.ObjectId(productId)
    let {reply}=msg
    let newReply=new replyModal({
        productId:pid,
        commentId:cid,
        reply
    })
      await newReply.save()
    return {status:1}
}
const delete_comment=async(commentId,userId)=>{
    let cid=mongoose.Types.ObjectId(commentId)
    let uid=mongoose.Types.ObjectId(userId)
    let isDeleted=await commentModal.deleteOne({$and:[{ userId:uid,_id:cid}]})
    if(isDeleted.deletedCount!=0){
        return {status:1}
    }else{
        return {Status:0}
    }
}
const delete_comment_reply=async(replyId,userId)=>{
    let rid=mongoose.Types.ObjectId(replyId)
    let uid=mongoose.Types.ObjectId(userId)
    let isDeleted=await replyModal.deleteOne({$and:[{userId:uid,_id:rid}]})
    if(isDeleted.deleteCount!=0){
      return {status:1}   
    }else{
        return {status:0}
    }
}

export {user_login,
       show_user_product,
       show_all_product,
       delete_user_product,
       update_user_product,
       show_single_product,
       add_comment,
       add_comment_reply,
       delete_comment,
       delete_comment_reply}