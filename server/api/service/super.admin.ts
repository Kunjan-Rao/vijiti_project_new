import { setPassword } from "../common/password";
import { genrateToken } from "../common/tokens";
import adminModal from "../modals/adminModal";

const add_admin=async(user)=>{
    try{
      let {username,password}=user
           password=await setPassword(password)
      let admin=new adminModal({
          username,password,role:0
      })
      await genrateToken(admin._id)
      await admin.save()
      return {status:1}
    }catch(err){
      return {status:0,err}

    }


}
export {add_admin}