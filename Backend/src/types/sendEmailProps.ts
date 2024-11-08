type SendMailProps = {
  email: string;
  name: string;
  subject: string;
  pathOfTemplate: string;
  otp?: number;
  link?: string;
};

export default SendMailProps;
