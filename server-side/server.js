import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js'
import { connectDB } from './config/db.js'

dotenv.config();

const app = express()
const port = 3000

await connectDB()

app.use(cors({
  origin :  'http://localhost:5173', 
  credentials : true
}))
app.use(express.json()); 
app.use(cookieParser());

app.get('/', (req, res)=> res.send("server is working...!!"))
app.use(userRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
