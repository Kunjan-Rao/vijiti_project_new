import * as express from 'express'
import { Application } from 'express-serve-static-core'
const app:Application=express()
const port=process.env.PORT

app.listen(port,()=>{
     console.log(`Server Runnig on ${port}`)

})



