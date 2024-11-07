import express from 'express';
import { PORT, CLIENT_URL} from './config/env';
import { connectDB } from './config/connectDB';
import routes from './routes/index'
import cors from 'cors'
const app = express()
const port = PORT || 4000

app.use(cors({
    origin: CLIENT_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/',routes)

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server Connected And Running On PORT: ${port}`)
    })
});

