import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendOtpEmail = async (to, otp) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Manthra Support" <no-reply@manthra.com>', // sender address
            to: to, // list of receivers
            subject: "Your Login OTP", // Subject line
            text: `Your OTP is: ${otp}`, // plain text body
            html: `<b>Your OTP is: ${otp}</b>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        // throw error; // Optional: throw if you want to fail the request
    }
};
