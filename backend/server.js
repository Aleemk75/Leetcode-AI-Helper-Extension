import express from "express";
import cors from "cors";
import "dotenv/config"
import explainRouter from "./routes/explain.js";
const app = express();

const allowedOrigin = "chrome-extension://khomlgglgjcpcdjmadneepcnebkpgepb";

app.use(cors({
  origin: allowedOrigin
}));

app.use(express.json());



app.use("/api/explain", explainRouter);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is listening on PORT", PORT);
});