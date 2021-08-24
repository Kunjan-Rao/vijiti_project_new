const jwt=require('jsonwebtoken')
const jwt_decode=require('jwt-decode')
const genrateToken=async(id:object)=>{
    try{
      
      let token=await jwt.sign({id},process.env.JWT_KEY)
      return token

    }catch(err){   
       return err

    }
}
//this is for verify token is valid or not
const verifyToken=async(isToken:any)=>{
    try{

      let decode=await jwt_decode(isToken)
     
       return decode
    }catch(err){
       return err

    }
}
export {genrateToken,verifyToken}