import * as bcrypt  from 'bcryptjs'
//this is for hashing a password
const setPassword= async(password:any)=>{
    try{
      let hashPassword=await bcrypt.hash(password,10)
      return hashPassword
    }catch(err){
      return err
    }        
  }
  //this is for compare password 
const verifyPassword=async(password:any,server_password:any)=>{ 
 try{
    let isValid=await bcrypt.compare(password,server_password)
    return isValid
 }catch(err){
    return err
 }

}
export {setPassword,verifyPassword}