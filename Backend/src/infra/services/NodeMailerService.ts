import IEmailService, {
  SendMailProps,
} from "../../domain/interfaces/services/IMailService";
import nodemailer from "nodemailer";
import { NODEMAILER_PASSKEY, SENDER_EMAIL } from "../config/env";
import fs from "fs/promises";
import path from "path";

export default class NodeMailerService implements IEmailService {
  async sendMail({
    email,
    name,
    subject,
    pathOfTemplate,
    link,
    otp,
  }: SendMailProps): Promise<void> {
    let htmlTemplate = await fs.readFile(
      path.join(__dirname, pathOfTemplate),
      "utf-8"
    );
    htmlTemplate = htmlTemplate.replace("{{name}}", name);

    if (otp) {
      htmlTemplate = htmlTemplate.replace("{{otp}}", otp.toString());
    }

    if (link) {
      htmlTemplate = htmlTemplate.replace("{{link}}", link);
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SENDER_EMAIL,
        pass: NODEMAILER_PASSKEY,
      },
    });

    await transporter.sendMail({
      from: SENDER_EMAIL,
      to: email,
      subject: subject || "No reply mail",
      html: htmlTemplate,
    });
  }
}
