const jwt=require('jsonwebtoken')
const genrateToken=async(id:object)=>{
    try{
      let token=await jwt.sign(id,process.env.JWT_KEY)
      return token

    }catch(err){   
       return err

    }
}
//this is for verify token is valid or not
const verifyToken=async(isToken:any)=>{
    try{
      let token=await jwt.verify(isToken,process.env.JWT_KEY)
      return token
    }catch(err){
       return err

    }
}
export {genrateToken,verifyToken}