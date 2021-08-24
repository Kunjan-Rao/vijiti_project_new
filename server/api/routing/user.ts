//common modules
import {router,Request,Response} from '../common/common-routing-methods'
//user routing
router.get('/user',(req:Request,res:Response)=>{
    res.send('hello from user side')
    
})
router.post('/register',require('../controller/user'))
export default router