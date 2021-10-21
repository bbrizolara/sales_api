import nodemailer from "nodemailer";
import {
  HandlebarsEmailTemplate,
  IParseEmailTemplate,
  ITemplateVariable,
} from "./handlebars_email_template";

interface ISendEmail {
  from?: IEmailContact;
  to: IEmailContact;
  subject: string;
  templateData: IParseEmailTemplate;
}

interface IEmailContact {
  name: string;
  email: string;
}

export default class EtherealEmail {
  public static async sendEmail({
    from,
    to,
    subject,
    templateData,
  }: ISendEmail) {
    const account = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: {
        name: from?.name || "Sales API",
        address: from?.email || "contact@salesapi.com",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await HandlebarsEmailTemplate.parse(templateData),
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
