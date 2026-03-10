require('dotenv').config();

const mailSender = async (email, title, body) => {
    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": process.env.MAIL_PASS
            },
            body: JSON.stringify({
                sender: {
                    name: "ShaadiBio",
                    email: process.env.MAIL_USER
                },
                to: [{ email: email }],
                subject: title,
                htmlContent: `<html><body>${body}</body></html>`
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.log("Brevo API error:", data);
            throw new Error(data.message || "Failed to send email");
        }

        console.log("Email sent successfully via Brevo:", data);
        return data;

    } catch (err) {
        console.log("Something went wrong while sending mail", err);
        throw err;
    }
}

module.exports = mailSender;