import * as rfs from "rotating-file-stream";
import path from "path";
import morgan from "morgan";
import fs from 'fs'

const logDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}


const logStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "logs"),
  maxFiles: 7,
  maxSize: "20M",
});

const logger = morgan("combined",{stream:logStream});
export const devLogger = morgan('dev')
export default logger;
