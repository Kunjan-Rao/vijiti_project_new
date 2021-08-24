import { setPassword, verifyPassword } from "../common/password"
import { genrateToken } from "../common/tokens"
import usermodal from "../modals/userModal"
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
export {user_register,user_login}