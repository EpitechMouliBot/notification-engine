import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();

class EmailSender {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    sendEmail(toMail, percentPassed, percentColor, url, projectName, statusContent, normeContent) {
        const emailContent = `
    <html>
    <head>
        <style>
            /* Style CSS pour la mise en page de l'e-mail */
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                background-color: #f4f4f4;
                padding: 20px;
                padding-bottom: 10px;
            }
            .header {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .percent {
                font-size: 24px;
                color: ${percentColor};
            }
            .section {
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">${projectName} | <span class="percent">${percentPassed}%</span></div>
            <div class="section">
                <p><strong>Status</strong></p>
                <p>${statusContent}</p>
            </div>
            <div class="section">
                <p><strong>Coding style</strong></p>
                <p>${normeContent}</pre>
            </div>
            <div class="section">
                <p><a href="${url}">Access to tests</a></p>
            </div>
        </div>
    </body>
    </html>
`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: toMail,
            subject: `New mouli | ${projectName}`,
            html: emailContent,
        };

        this.transporter.sendMail(mailOptions, (err, rsp) => {
            if (err) {
                console.error('Error when sending email:', err);
            }
        });
    }
}

export default EmailSender;