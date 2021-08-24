//commmon modules
import {router,Request,Response} from '../common/common-routing-methods'
//super admin routing
router.get('/admin',(req:Request,res:Response)=>{
    res.send('hello from admin side')
    
})
export default router