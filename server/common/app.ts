import * as express from 'express'
import * as dotenv from 'dotenv'
import { Application } from 'express'
import userRouter from '../api/routing/user'
import productRouter from '../api/routing/product'
import './config/db'
const app:Application=express()
dotenv.config()
const port=process.env.PORT
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/user',userRouter)
app.use('/product',productRouter)
app.listen(port,()=>{
     console.log(`Server Runnig on ${port}`)

})



