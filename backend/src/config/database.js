import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const runServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (e) {
        console.log(e.message)
    }
        
};

export default runServer;
