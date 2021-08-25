//commmon modules
import { superadmin } from '../autorization/authorization'
import {router} from '../common/common-routing-methods'
import {add_admin_controller} from '../controller/super.admin'
//super admin routing
router.post('/admin',add_admin_controller)
export default router