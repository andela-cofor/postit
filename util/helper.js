const nodemailer = require('nodemailer');
require('dotenv').config();
console.log(process.env);

// create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
  });

function sendMail(receiver, channel, sender) {

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"PostIt 👻" <no-reply@postit.com>', // sender address
    to: receiver, // list of receivers
    subject: 'Invite', // Subject line
    html: `<p><b>Hello, ${sender} has invited you to 
    ${channel} group on PosIt</b><br />
      Channel Name: <b>${channel}</b><i><u></u>
      </i> join channel by pasting channel name and click enter` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
      return false;
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return true;
  });
}

function sendUrgentMail(receiver, channel, sender, message) {

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"PostIt 👻" <no-reply@postit.com>', // sender address
    to: receiver, // list of receivers
    subject: 'Invite', // Subject line
    html: `<p><b>Hello, ${sender} sent  
    ${message}</b><br />
      Channel Name: <b>${channel}</b><i><u></u>
      </i> It is Urgent!!!` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
      return false;
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    return true;
  });
}

module.exports = { sendMail, sendUrgentMail };