import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongodb connected successfully');
    }
    catch(error){
        console.log(error);
    }
};
export default connectDB;
