import { string } from 'joi'
import * as mongoose from 'mongoose'
import {comment} from '../interface/comment'

const commentSchema=new mongoose.Schema<comment>({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    ProductId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    comment:{
        type:String,
        required:true
    }

})
const commentModal=mongoose.model('comment',commentSchema)
export default commentModal