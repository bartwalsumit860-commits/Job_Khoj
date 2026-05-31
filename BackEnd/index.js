import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config({})
const app = express();

//path
const _dirname = path.resolve();

//middlewere
app.use(express.json());//data will be in json
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
const corsOptions = {
    origin:['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials:true
}
app.use(cors(corsOptions));

app.use("/api", (req, res, next) => {
    if (mongoose.connection.readyState === 1) {
        return next();
    }

    return res.status(503).json({
        message: "Database connection is not ready yet. Please try again in a moment.",
        success: false
    });
});

const PORT = process.env.PORT||3000;

//api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute)

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.use((req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});


const startServer = async () => {
    const dbConnected = await connectDB();

    if (!dbConnected) {
        console.warn("Starting server while MongoDB retries in the background.");
    }

    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`);
    });
};

startServer();
