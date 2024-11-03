import express from 'express';
import { PORT, CLIENT_URL} from './infra/config/env';
import { connectDB } from './infra/config/connectDB';
import routes from './presentation/routers/index'
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

