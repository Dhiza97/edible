import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

export const sendEmail = async (email, otp, type) => {
  let subject, text;

  if (type === "verification") {
    subject = "Verify Your Email";
    text = `<h2>Your OTP for email verification is: ${otp}. It will expire in 10 minutes.</h2>`;
  } else if (type === "passwordReset") {
    subject = "Reset Your Password";
    text = `<h2>Your OTP for password reset is: ${otp}. It will expire in 10 minutes.</h2>`;
  } else {
    throw new Error("Invalid email type");
  }

  const mailOptions = {
    from: `"Edible" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject,
    html: text,
  };

  return transporter.sendMail(mailOptions);
};
