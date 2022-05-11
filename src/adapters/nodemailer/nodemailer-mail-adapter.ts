import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "caca45fb8358e3",
        pass: "235f4904206cbc"
    }
});


export class NodemailerMailAdpter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Hemerson <hi@hemerson.com>',
            to: 'Hemerson Farias <centerofmails@gmail.com>',
            subject,
            html: body
        })
    }

}