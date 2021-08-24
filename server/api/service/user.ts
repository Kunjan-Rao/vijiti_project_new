import usermodal from "../modals/userModal"
const user_register=async({name,email,mobileno,password})=>{
    try{
        const user=await new usermodal({name,email,mobileno,password})
        await user.save() 
        return {status:1}

    }catch(err){
        return {status:0,err}
        
    }

}
export {user_register}