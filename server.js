// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Set up Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service provider
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password', // Use environment variables for better security
    },
});

// Handle form submission
app.post('/submit-contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'your-email@example.com', // Your email address
        subject: `New Contact Form Submission: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({ success: false, message: 'Failed to send message. Please try again later.' });
        }
        res.json({ success: true });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
