//common modules
import {router,Request,Response} from '../common/common-routing-methods'
import {user} from '../autorization/authorization'
//products routing
router.get('/',user,(req:Request,res:Response)=>{
    res.send('hello from admin side')
    
})
export default router