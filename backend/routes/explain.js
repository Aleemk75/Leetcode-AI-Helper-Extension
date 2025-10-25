
import express from "express";
const router = express.Router();
import { getGemeniResponse } from "../utils/geminiAI.js"

router.post("/", async (req, res) => {
    try {
        if (req.body.length === 0) {
            return res.json({ message: "invalid req body" })
        }
        const { explain } = req.body;
        if (!explain) {
            return res.json({ message: "invalid parameter explain" })
        }


        let result = await getGemeniResponse(explain);
        if (!result) {
            return res.json({ message: "No response from AI" });
        }
        
        res.json(result);

    } catch (e) {
        console.log("error in explain route", e);
        res.json({ message: "Internal Server Error" })
    }
});

export default router;