//common modules
import {router,Request,Response} from '../common/common-routing-methods'
//admin routig
router.get('/admin',(req:Request,res:Response)=>{
    res.send('hello from admin side')
    
})
export default router