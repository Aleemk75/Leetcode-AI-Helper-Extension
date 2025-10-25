
import express from "express";
const router = express.Router();
import {getGemeniResponse} from "../utils/geminiAI.js"

router.post("/" , async(req,res)=>{
    try{

     const {explain} = req.body;
     if(!explain){
        return res.json({message:"invalid req body"})
     }

     
let result = await getGemeniResponse(explain);

console.log("res",result);

 res.json(result);

    }catch(e){
        console.log("error in explain route" , e);
        res.json({message:"Internal Server Error"})
    }
});

export default router;