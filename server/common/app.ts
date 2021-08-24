import * as express from 'express'
import * as dotenv from 'dotenv'
import { Application } from 'express'
import userRouter from '../api/routing/user'
import './config/db'
const app:Application=express()
dotenv.config()
const port=process.env.PORT
app.use('/user',userRouter)
app.listen(port,()=>{
     console.log(`Server Runnig on ${port}`)

})



