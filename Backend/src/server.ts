import express from 'express';
import { PORT, CLIENT_URL } from './config/env';
import { connectDB } from './config/connectDB';
import routes from './routes/index'; 
import cors from 'cors';
import {requestLogger,devLogger} from './utils/logger';
const app = express();
const port = PORT || 4000;

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(requestLogger);
app.use(devLogger);
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server Connected And Running On PORT: ${port}`);
  });
});
