const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD
    }
});

// Function to send OTP email
async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: email,
    subject: "Login OTP",
    text: `Your OTP is ${otp}. It expires in an hour.`,
  };
  try{
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  }
  catch(error){
    console.error(`Error sending OTP to ${email}:`, error);
    throw new Error('Failed to send OTP email');
  }
}

module.exports = sendOTPEmail;
