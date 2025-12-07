import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/UserRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express()
await connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.send("Server is Live....")
})
app.use('/api/user',userRouter)
app.use('/api/resume',resumeRouter)
app.use('/api/ai', aiRouter)

if(process.env.NODE_ENV !== 'production'){
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`)
    }) 
}

export default server
