const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;

    // Configure Nodemailer (use your email service credentials)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-app-password',
        },
    });

    const mailOptions = {
        from: email,
        to: 'heyxrafi@hotmail.com',
        subject: `New Message from ${name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent!');
    } catch (error) {
        res.status(500).send('Error sending message.');
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
