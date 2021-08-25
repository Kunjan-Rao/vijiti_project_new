//common modules

import *  as express from 'express'
import * as userController from '../controller/user'
import { user } from '../autorization/authorization'
const router=express.Router()
//user routing
router.post('/login',userController.login)
router.post('/product',user,userController.add_product_controller)
router.get('/product',user,userController.show_user_product_controller)
router.get('/product/:id',user,userController.show_single_product_controller)
router.post('/product/comment/:id',user,userController.add_comment_product_controller)
router.get('/products',user,userController.show_all_product_controller)
router.delete('/delete/:id',user,userController.delete_user_product_controller)
router.put('/update/:id',user,userController.update_user_product_controller)

export default router