const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/send-email", (req, res) => {
    const { subject, message, email } = req.body;

    const username = process.env.EMAIL_USERNAME;
    const password = process.env.EMAIL_PASSWORD;
    const to = process.env.EMAIL_TO;
    const from = process.env.EMAIL_FROM;

    const transporter = nodemailer.createTransport({
        host: "smtp.elasticemail.com",
        port: 2525,
        secure: false,
        auth: {
            user: username,
            pass: password,
        },
    });

    const mailOptions = {
        from,
        to,
        subject,
        html: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send("Email sent: " + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
