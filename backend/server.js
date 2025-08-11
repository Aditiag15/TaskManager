import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import TaskRoutes from "./routes/TaskRoutes.js";

const app=express();


config(); //load env file

connectDB(); //connect database

app.use(cors({
  origin: "http://localhost:5173",  // <-- set your frontend URL here
  credentials: true,                // <-- important to allow cookies
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api",AuthRoutes);
app.use("/api/task",TaskRoutes)

const PORT= process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})