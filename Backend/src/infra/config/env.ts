import dotenv from 'dotenv';
dotenv.config();

const {PORT,MONGO_URI,NODEMAILER_PASSKEY,SENDER_EMAIL} = process.env

export{
    PORT,
    MONGO_URI,
    NODEMAILER_PASSKEY,
    SENDER_EMAIL
}