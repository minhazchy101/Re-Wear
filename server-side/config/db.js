import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/reWear`);
        console.log("Database connected successfully..");
       
   
    } catch (error) {
        console.log(`mongoose connect error => ${error}`)
    }
}