require('dotenv').config();

// const mailSender = async (email, title, body) => {
//     try {
//         const response = await fetch("https://api.brevo.com/v3/smtp/email", {
//             method: "POST",
//             headers: {
//                 "accept": "application/json",
//                 "content-type": "application/json",
//                 "api-key": process.env.MAIL_PASS
//             },
//             body: JSON.stringify({
//                 sender: {
//                     name: "ShaadiBio",
//                     email: process.env.MAIL_USER
//                 },
//                 to: [{ email: email }],
//                 subject: title,
//                 htmlContent: `<html><body>${body}</body></html>`
//             })
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             console.log("Brevo API error:", data);
//             throw new Error(data.message || "Failed to send email");
//         }

//         console.log("Email sent successfully via Brevo:", data);
//         return data;

//     } catch (err) {
//         console.log("Something went wrong while sending mail", err);
//         throw err;
//     }
// }

const axios = require('axios');

const mailSender = async (email, title, body) => {
    try {
        const response = await axios.post("https://api.brevo.com/v3/smtp/email", {
            sender: { name: "ShaadiBio", email: process.env.MAIL_USER },
            to: [{ email: email }],
            subject: title,
            htmlContent: `<html><body>${body}</body></html>`
        }, {
            headers: {
                "api-key": process.env.MAIL_PASS,
                "Content-Type": "application/json"
            }
        });

        return response.data;
    } catch (err) {
        console.error("Brevo Error:", err.response ? err.response.data : err.message);
        throw err;
    }
}

module.exports = mailSender;