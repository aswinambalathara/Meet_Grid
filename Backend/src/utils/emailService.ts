import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { NODEMAILER_PASSKEY, SENDER_EMAIL } from "../config/env";
import { promisify } from "util";
import SendEmailProps from "../types/sendEmailProps";

const readFileAsync = promisify(fs.readFile);

export default class NodeMailerService {
  async sendMail({
    email,
    name,
    pathOfTemplate,
    link,
    otp,
    subject,
  }: SendEmailProps): Promise<void> {
    let htmlTemplate = await readFileAsync(
      path.join(__dirname, "../../public/", pathOfTemplate),
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
      subject: subject || "No Reply Mail",
      html: htmlTemplate,
    });
  }
}
