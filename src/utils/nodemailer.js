import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

export const sendVerificationEmail = async (email, otp) => {
  const mailOptions = {
    from: `"Edible" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: "Verify Your Email",
    text: `<h1>Your OTP for email verification is: ${otp}. It will expire in 10 minutes.</h1>`,
  };

  return transporter.sendMail(mailOptions);
};
