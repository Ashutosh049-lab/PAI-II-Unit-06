const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

async function sendEmail({ to, subject, html }) {
  const info = await transporter.sendMail({
    from: `"Eventify" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html
  });
  return info.messageId;
}

const templates = {
  welcome: (name) => `
    <h3>Welcome to Eventify 🎟️</h3>
    <p>Hello <strong>${name}</strong>, your account has been created successfully.</p>
  `,
  booking: ({ userName, eventName, quantity, totalAmount }) => `
    <h3>Eventify — Booking Confirmed</h3>
    <p>Hi <strong>${userName}</strong>, your booking is confirmed.</p>
    <p><strong>Event:</strong> ${eventName}</p>
    <p><strong>Tickets:</strong> ${quantity}</p>
    <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
  `,
  cancel: ({ userName, eventName }) => `
    <h3>Eventify — Booking Cancelled</h3>
    <p>Hi <strong>${userName}</strong>, your booking for <strong>${eventName}</strong> has been cancelled.</p>
  `
};

module.exports = {
  sendEmail,
  templates
};
