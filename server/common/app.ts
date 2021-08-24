import * as express from 'express'
import * as dotenv from 'dotenv'
import { Application } from 'express'
import userRouter from '../api/routing/user'
import adminRouter from  '../api/routing/admin'
import './config/db'
const app:Application=express()
dotenv.config()
const port=process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.listen(port,()=>{
     console.log(`Server Runnig on ${port}`)

})



