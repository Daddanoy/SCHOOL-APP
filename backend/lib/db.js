import mongoose from 'mongoose';

export default async function connectDB(){

  try {  
    const con = await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to DB')
  } catch (error) {
    console.log("Error connecting to MongoDB", error)
    
  }
}