//common modules

import *  as express from 'express'
import { reqister,login } from '../controller/user'
const router=express.Router()
//user routing
router.post('/login',login)
router.post('/register',reqister)
export default router