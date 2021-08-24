import { setPassword} from "../common/password"
import { genrateToken } from "../common/tokens"
import usermodal from '../modals/userModal'
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
export {user_register}