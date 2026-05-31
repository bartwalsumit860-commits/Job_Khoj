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
import fs from "fs";

dotenv.config({})
const app = express();

//path
const _dirname = path.resolve();
const frontendDistPath = path.join(_dirname, "FrontEnd", "dist");
const frontendIndexPath = path.join(frontendDistPath, "index.html");

//middlewere
app.use(express.json());//data will be in json
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
const corsOptions = {
    origin:['https://job-khoj-3.onrender.com'],
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

if (fs.existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));
    app.use((req, res) => {
        res.sendFile(frontendIndexPath);
    });
}


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
