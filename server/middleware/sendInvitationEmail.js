// utils/sendInvitationEmail.js

const nodemailer = require('nodemailer');

const sendInvitationEmail = async (to, invitationLink) => {
    const transporter = nodemailer.createTransport({
        // Configure your email transporter (SMTP, etc.)
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465, // for secure (SSL/TLS)
        secure: true,
        auth: {
            user: 'arto.1.matilainen@gmail.com',
            pass: 'jczoumzuhhahmoij',
        },
    });

    const mailOptions = {
        from: 'gólfiles@gmail.com',
        to,
        subject: 'Invitation to join the group',
        text: `Click the following link to join the group: ${invitationLink} (not working yet)\n\nThe service at TBD`,
      };
      
    await transporter.sendMail(mailOptions);
};

module.exports = sendInvitationEmail;