import * as mongoose from 'mongoose'


const replySchema=new mongoose.Schema({
    productId:{
        type:mongoose.Types.ObjectId,
        ref:'products'
    },
    commentId:{
        type:mongoose.Types.ObjectId,
        ref:'comments'
    },
    reply:{
        type:String,
        required:true
    }

})
const replyModal=mongoose.model('reply',replySchema)
export default replyModal