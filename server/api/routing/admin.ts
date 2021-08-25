//common modules
import {router,Request,Response} from '../common/common-routing-methods'
import {admin_login_controller, reqister,
       show_all_user_controller,
       delete_user_controller} from '../controller/admin'
import {admin} from '../autorization/authorization'
//admin routig
router.post('/login',admin_login_controller)
router.post('/register',admin,reqister)
router.get('/user',admin,show_all_user_controller)
router.post('/user/delete/:id',admin,delete_user_controller)

export default router