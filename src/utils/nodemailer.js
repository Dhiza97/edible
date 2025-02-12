import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOTPEmail = async (email, otp, type) => {
  const subject =
    type === "verification"
      ? "Verify Your Email - Edible"
      : "Reset Your Password - Edible";

  const message =
    type === "verification"
      ? `Use the OTP below to verify your email.`
      : `Use the OTP below to reset your password. If you did not request a password reset, please ignore this email.`;

  const mailOptions = {
    from: `"Edible" <${process.env.SENDER_EMAIL}>`,
    to: email,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; background: #f9f9f9; text-align: center;">
        <h2 style="color: #333; text-align: center;">${subject}</h2>
        <p style="font-size: 16px; color: #555; text-align: center;">
          ${message} This code will expire in <strong>10 minutes</strong>.
        </p>
        <div style="text-align: center; font-size: 24px; font-weight: bold; background: #EB5A3C; color: white; padding: 10px 20px; border-radius: 5px; display: inline-block; margin: 20px auto;">
          ${otp}
        </div>
        <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
          If you did not request this, please ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #888; text-align: center;">
          &copy; ${new Date().getFullYear()} Edible. All rights reserved.
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};
