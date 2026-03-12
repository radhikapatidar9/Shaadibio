const axios = require('axios');

const mailSender = async (email, title, body) => {
    // 1. Log to the Render console to see if the key is actually reaching this file
    console.log("Attempting to send email to:", email);
    console.log("Using Sender Email:", process.env.MAIL_USER);
    
    // Check if key exists (don't log the whole key for security, just length)
    if (!process.env.MAIL_PASS) {
        console.error("CRITICAL: MAIL_PASS is undefined in mailSender.js!");
    }

    try {
        const response = await axios.post("https://api.brevo.com/v3/smtp/email", {
            sender: { 
                name: "ShaadiBio", 
                email: process.env.MAIL_USER 
            },
            to: [{ email: email }],
            subject: title,
            htmlContent: `<html><body>${body}</body></html>`
        }, {
            headers: {
                // Use lowercase and ensure no hidden spaces
                "api-key": process.env.MAIL_PASS.trim(), 
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        console.log("Brevo Success Response:", response.data);
        return response.data;

    } catch (err) {
        console.error("Brevo Error Detail:", err.response ? err.response.data : err.message);
        throw err;
    }
}

module.exports = mailSender;