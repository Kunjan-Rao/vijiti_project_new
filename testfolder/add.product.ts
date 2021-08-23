import productModal from "../modals/productModal";
import {Request,Response} from 'express'
export default async(req:Request,res:Response)=>{
    try{
     
       let {item,category,price}=req.body

       const product=new productModal({
           item,
           category,
           price
       })
        await product.save()
        res.status(200).send({success:"data inserted successfully"})
    }catch(err){
        res.send({error:"Data not Inserted.."})

    }

}
