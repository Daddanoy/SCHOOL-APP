import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import questionRoute from './routes/question.routes.js'


dotenv.config();


const app = express()

const PORT = process.env.PORT ;
const __dirname = path.resolve()

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))






app.use("/api", questionRoute)

if(process.env.NODE_ENV ==="production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get('/:any(*)', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
} //servers static files. path to the static assets that has the html and css files. goes 1 up into the main folder then into frontend. 






app.listen(PORT,()=>{ 
  console.log("Server is running on port " + PORT);
  connectDB();
})

