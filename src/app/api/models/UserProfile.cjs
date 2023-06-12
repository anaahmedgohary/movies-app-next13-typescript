const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
    // email: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    birthday: { type: String },
    phone: { type: String },
    city: { type: String },
    date: { type: String, default: new Date().toLocaleString() },
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
