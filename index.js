import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./database/db.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import defRouter from "./routes/user.js";
import postRouter from "./routes/posts.js"
const app = express();
connectDB();
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

dotenv.config();
const PORT = process.env.PORT || 5000
app.use(cookieParser());

app.use(express.json());

app.use("/api",defRouter);
app.use("/api", postRouter);



app.listen(PORT, () => {
    console.log("server is running on port 5000");
})