import nodemailer from "nodemailer";

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true', // Use SSL for secure connections
  auth: {
    user: process.env.SMTP_USER,  // SMTP username
    pass: process.env.SMTP_PASS,  // SMTP password
  },
});

const domain = process.env.NEXT_PUBLIC_APP_URL;

// Send password reset email
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const mailOptions = {
    from: process.env.SMTP_FROM, // Your email address (sender)
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// Send email verification email
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const mailOptions = {
    from: process.env.SMTP_FROM, // Your email address (sender)
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// Send two-factor authentication token email
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.SMTP_FROM, // Your email address (sender)
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code is: <strong>${token}</strong></p>`,
  };

  await transporter.sendMail(mailOptions);
};
