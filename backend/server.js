import express from "express";
import cors from "cors";
import "dotenv/config"
import explainRouter from "./routes/explain.js";
const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/explain", explainRouter);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is listening on PORT", PORT);
});