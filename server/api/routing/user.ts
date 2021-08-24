//common modules

import *  as express from 'express'
import {
        login,
        add_product_controller,
        show_user_product_controller,
        show_all_product_controller,
        delete_user_product_controller,
        update_user_product_controller} from '../controller/user'
import { user } from '../autorization/authorization'
const router=express.Router()
//user routing
router.post('/login',login)
router.post('/product',user,add_product_controller)
router.get('/product',user,show_user_product_controller)
router.get('/all-product',user,show_all_product_controller)
router.delete('/delete/:id',user,delete_user_product_controller)
router.put('/update/:id',user,update_user_product_controller)

export default router