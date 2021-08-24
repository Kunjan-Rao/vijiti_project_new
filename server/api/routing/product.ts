//common modules
import {router,Request,Response} from '../common/common-routing-methods'
//products routing
router.get('/product',(req:Request,res:Response)=>{
    res.send('hello from admin side')
    
})
export default router