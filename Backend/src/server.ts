import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './infra/config/connectDB';

const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json());

connectDB()

app.listen(PORT,()=>{
    console.log(`Server Connected And Running On PORT: ${PORT}`)
})