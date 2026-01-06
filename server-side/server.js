import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js'
import { connectDB } from './config/db.js'
import clothesRouter from './routes/clothesRoute.js';
import connectCloudinary from './config/cloudinary.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

const app = express()
const port = 3000

await connectDB()
await connectCloudinary()
// console.log("CLIENT_URL:", process.env.CLIENT_URL);
// app.use(cors({
//   origin :  process.env.CLIENT_URL, 
//   credentials : true
// }))

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",")
  : [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
// app.options("*", cors());
app.use(express.json()); 
app.use(cookieParser());



app.get('/', (req, res)=> res.send("server is working...!!"))
app.use(userRouter)
app.use(clothesRouter)
app.use(orderRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
