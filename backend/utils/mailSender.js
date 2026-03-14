const axios = require("axios");
require('dotenv').config();

const sendWithBrevo = async (email, title, body) => {
    const apiKey = process.env.BREVO_KEY;
    if (!apiKey) {
        throw new Error("BREVO_KEY is not configured");
    }

    const senderEmail = process.env.BREVO_SENDER || process.env.MAIL_USER;
    if (!senderEmail) {
        throw new Error("BREVO_SENDER is not configured");
    }

    const senderName = process.env.BREVO_SENDER_NAME || "Shaadibio";
    const start = Date.now();

    const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
            sender: { email: senderEmail, name: senderName },
            to: [{ email }],
            subject: title,
            htmlContent: `<div>${body}</div>`
        },
        {
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                "api-key": apiKey
            }
        }
    );

    const elapsedMs = Date.now() - start;
    console.log(`[MailSender] Brevo email sent in ${elapsedMs}ms`);
    return response.data;
};

const mailSender = async (email, title, body) => {
    try {
        console.log(`[MailSender] Sending email to: ${email}`);

        return await sendWithBrevo(email, title, body);
    } catch (error) {
        console.error("[MailSender] Error while sending mail:", error.message);
        throw error;
    }
};

module.exports = mailSender;









// const { Resend } = require('resend');

// // Add RESEND_API_KEY to your Render Environment Variables
// const resend = new Resend(process.env.RESEND_API_KEY);

// const mailSender = async (email, title, body) => {
//     try {
//         console.log("Attempting to send mail via Resend...");
        
//         const data = await resend.emails.send({
//             from: 'onboarding@resend.dev', // Use this for testing
//             to: email,
//             subject: title,
//             html: `<strong>${body}</strong>`,
//         });

//         console.log("Resend Success:", data);
//         return data;
//     } catch (error) {
//         console.error("Resend Error:", error);
//         throw error;
//     }
// };

// module.exports = mailSender;




// const SibApiV3Sdk = require('@getbrevo/brevo');

// const mailSender = async (email, title, body) => {
//     // We are setting the key directly into the SDK's internal configuration
//     let defaultClient = SibApiV3Sdk.ApiClient.instance;
//     let apiKey = defaultClient.authentications['api-key'];
//     apiKey.apiKey = process.env.MAIL_PASS.trim(); 

//     let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
//     let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

//     sendSmtpEmail.subject = title;
//     sendSmtpEmail.htmlContent = `<html><body>${body}</body></html>`;
//     sendSmtpEmail.sender = { "name": "ShaadiBio", "email": process.env.MAIL_USER.trim() };
//     sendSmtpEmail.to = [{ "email": email }];

//     try {
//         const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
//         console.log('API called successfully. Returned data: ' + JSON.stringify(data));
//         return data;
//     } catch (error) {
//         console.error("BREVO SDK ERROR:", error.response ? error.response.text : error.message);
//         throw error;
//     }
// };

// module.exports = mailSender;





// const mailSender = async (email, title, body) => {
//     // 1. Debug log to verify Render is actually seeing the key
//     // We only log the length and the first 10 chars to keep it secure
//     const key = process.env.MAIL_PASS ? process.env.MAIL_PASS.trim() : "";
//     console.log(`Key check: Length=${key.length}, Starts with=${key.substring(0, 10)}`);

//     try {
//         const response = await axios({
//             method: 'post',
//             url: 'https://api.brevo.com/v3/smtp/email',
//             headers: {
//                 // Force the header name as a string to prevent hyphen issues
//                 'api-key': key, 
//                 'content-type': 'application/json',
//                 'accept': 'application/json'
//             },
//             data: {
//                 sender: { 
//                     name: "ShaadiBio", 
//                     email: process.env.MAIL_USER.trim() 
//                 },
//                 to: [{ email: email }],
//                 subject: title,
//                 htmlContent: `<html><body>${body}</body></html>`
//             }
//         });

//         console.log("SUCCESS: Email sent via Brevo API");
//         return response.data;

//     } catch (err) {
//         // This will print the EXACT error message from Brevo
//         console.error("BREVO ERROR:", err.response ? err.response.data : err.message);
//         throw err;
//     }
// }





