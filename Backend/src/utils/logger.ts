import * as rfs from "rotating-file-stream";
import path from "path";
import morgan from "morgan";
import fs from 'fs'

const logDirectory = path.join(__dirname,'..', "logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}


const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
  maxFiles: 7,
  maxSize: "20M",
});

const requestLogger = morgan("combined",{stream:accessLogStream});

const errorLogStream = rfs.createStream('error.log',{
  interval:'1d',
  path:logDirectory,
  maxFiles:7,
  maxSize:'20M'
})

const errorLogger = morgan('combined',{stream:errorLogStream});

const devLogger = morgan('dev')

export {errorLogger,requestLogger,devLogger}

