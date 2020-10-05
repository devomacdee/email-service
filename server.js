const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");

const port = 3000;

require("dotenv").config();

const app = express();

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;

app.use(bodyParser.json());

app.post("/contact", (req, res) => {
  console.log("req", req.body);
  const smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  // specify email structure
  const mailOpts = {
    from: "My email form", // ignored by Gmail
    to: GMAIL_USER,
    subject: `new message from ${req.body.name}: ${req.body.email}`,
    text: `${req.body.bodymessage}`,
  };

  // send the email
  smtpTrans.sendMail(mailOpts, (err, response) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Email server listening at http://localhost:${port}`);
});
