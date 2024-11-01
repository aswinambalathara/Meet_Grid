import express from 'express';
import { PORT } from './infra/config/env';
import { connectDB } from './infra/config/connectDB';

const app = express()
const port = PORT || 4000
app.use(express.json());

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server Connected And Running On PORT: ${port}`)
    })
});

