import productModal from "../modals/productModal";
import { Request,Response } from "express";


export default async(req:Request,res:Response)=>{
    try{
        let limit=req.params.limit||10
        console.log(limit )
        // let skip=
        // let product=await productModal.find().limit().skip(1)
        const product= await productModal.aggregate([
            { $project:  {_id:0}},
            { $limit:2}
        
          ]);
            res.status(200).send(product)

    }catch(err){
        console.log('Data can not displayed')

    }

}