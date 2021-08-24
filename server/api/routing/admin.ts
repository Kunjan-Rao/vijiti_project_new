//common modules
import {router,Request,Response} from '../common/common-routing-methods'
import {reqister} from '../controller/admin'
//admin routig
router.get('/product',(req:Request,res:Response)=>{
    res.send('hello from admin side')
    
})
router.post('/register',reqister)


export default router