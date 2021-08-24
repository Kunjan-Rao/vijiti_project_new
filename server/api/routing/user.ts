//common modules
import { Request,Response} from 'express'
import *  as express from 'express'
import { reqister } from '../controller/user'
const router=express.Router()
//user routing
router.get('/',(req:Request,res:Response)=>{
    res.send('hello from user side')
    
})
router.post('/register',reqister)
export default router