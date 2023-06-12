const mongoose = require("mongoose");

const NewsletterEamilSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: String, default: new Date().toLocaleString() },
});

module.exports = mongoose.model("NewsletterEamil", NewsletterEamilSchema);
