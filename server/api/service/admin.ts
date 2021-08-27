import { setPassword,verifyPassword} from "../common/password"
import { genrateToken } from "../common/tokens"
import adminModal from "../modals/adminModal"
import usermodal from '../modals/userModal'
const admin_login=async({username,password})=>{
    try{ 
        let admin=await adminModal.findOne({username})
        if(admin){
         const isValid=await verifyPassword(password,admin.password)
             if(isValid){
                 let token=await genrateToken(admin._id) 
                 return {status:1,token}
             }
        }
 
     }catch(err){
         return{status:0,err}
     }
    
}
const user_register=async({name,email,mobileno,password})=>{
    try{
        //faching data from user controller 
        password=await setPassword(password)
        const user=await new usermodal({name,email,mobileno,password})
              await genrateToken(user._id) //genrate token
      
             await user.save() //save data into the collection
        return {status:1}

    }catch(err){
        return {status:0,err}
        
    }

}

const show_all_user=async()=>{
    try{  
    const users=await usermodal.aggregate([
        {
            $match:{}
        },
        {
            $project:{password:0}
        }
    ])

     return {status:1,users}

    }catch(err){
        return {status:0,err}

    }

}
const user_delete=async(_id)=>{
    try{
        let isDeleted=await usermodal.deleteOne({_id})
        console.log(isDeleted)
        return isDeleted
  
    }catch(err){
        return err

    }
}
export {user_register,
       show_all_user,
       admin_login,
       user_delete}