const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this to your desired port

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public')); // Assuming your static files are in the 'public' directory

app.post('/submit-form', (req, res) => {
    try{
  const { Name, Email, Message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your@gmail.com', // replace with your Gmail address
      pass: 'your-password' // replace with your Gmail password or app-specific password
    }
  });

  const mailOptions = {
    from: 'your@gmail.com', // replace with your Gmail address
    to: 'jenniferkosencha@gmail.com',
    subject: 'New Form Submission',
    text: `Name: ${Name}\nEmail: ${Email}\nMessage: ${Message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully');
    }
  });


}catch (err) {
    console.error('Internal Server Error:', err);
    res.status(500).send('Internal Server Error');
  }
});
