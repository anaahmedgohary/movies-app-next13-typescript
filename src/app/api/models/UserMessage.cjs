const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    email: { type: String },
    message: { type: String },
    date: { type: String },
});

module.exports = mongoose.model("UserMessage", messageSchema);
