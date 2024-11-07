export type SendMailProps = {
email:string;
name:string;
subject:string;
pathOfTemplate:string;
otp?:number;
link?:string;
}

export default interface IEmailService{
    sendMail({email,name,subject,pathOfTemplate,link,otp}:SendMailProps):Promise<void>
}