const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.GMAILU_SECRET}`,
    pass: `${process.env.GMAIL_SECRET}`
  }
});



const mailOptions = {
  from: `${process.env.GMAILU_SECRET}`,
  to: `${process.env.GMAILU_SECRET}`,
  subject: 'Confirmation Code',
  text: 'Hello Welcome to Auth project Please enter the code to access in our platform! ,hola cami xd'
};




module.exports={transporter,mailOptions}