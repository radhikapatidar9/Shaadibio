const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
        expires: 5*60
    },
    otp: {
        type: String,
        required: true
    }
})

async function emailVerification(email, otp) {
    try {

        await mailSender(email, "Verification email from Shaadibio", otp);
        console.log("Email sent successfully!");

    } catch(err) {
        console.log(err);
    }
}

otpSchema.pre("save", async function() {
    await emailVerification(this.email, this.otp);
    // next();
})

module.exports = mongoose.model("OTP", otpSchema);