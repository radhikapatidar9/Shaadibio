const axios = require('axios');

const mailSender = async (email, title, body) => {
    // These logs will tell us exactly what is missing in the Render Dashboard
    console.log("--- Email Debugging ---");
    console.log("Recipient:", email);
    console.log("Sender Configured:", process.env.MAIL_USER ? "YES" : "NO");
    console.log("API Key Configured:", process.env.MAIL_PASS ? "YES" : "NO");

    try {
        const response = await axios({
            method: 'post',
            url: "https://api.brevo.com/v3/smtp/email",
            headers: {
                // .trim() removes any accidental spaces or newlines from Render
                "api-key": process.env.MAIL_PASS.trim(),
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            data: {
                sender: { 
                    name: "ShaadiBio", 
                    email: process.env.MAIL_USER.trim() 
                },
                to: [{ email: email }],
                subject: title,
                htmlContent: `<html><body>${body}</body></html>`
            }
        });

        console.log("Result: Email sent successfully!");
        return response.data;

    } catch (err) {
        // This will print the exact reason from Brevo in your Render logs
        console.error("Brevo Error Response:", err.response ? err.response.data : err.message);
        throw err;
    }
}

module.exports = mailSender;