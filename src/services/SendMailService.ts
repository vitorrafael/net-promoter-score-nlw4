import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import log from "../logger";

class SendMailService {

    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        });
    }

    async execute(to: string, subject: string, variables: Record<string, unknown>, templatePath: string) {
        const templateFileContent = fs.readFileSync(templatePath).toString("utf-8");

        const handlebarsTemplate = handlebars.compile(templateFileContent);
        const html = handlebarsTemplate(variables);

        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreply@nps.com.br>"
        });

        log.info(`Message sent: ${message.messageId}`);
        log.info(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
    }
}

export default new SendMailService();