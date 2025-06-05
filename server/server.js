import express from "express";
import 'dotenv/config'
import cors from 'cors';
import adminRouter from "./routes/adminRoutes.js";
import { connectDB } from "./config/db.js";
import blogRouter from "./routes/blogRoutes.js";
const app=express();
await connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
app.get("/", (req, res) => {
  res.send("Mern Blog Backend is running");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));

