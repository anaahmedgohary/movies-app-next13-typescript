const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    googleid: { type: String, required: true },
    displayname: { type: String, required: true },
    familyname: { type: String, required: true },
    givenname: { type: String, required: true },
    // name: { familyName: {type: String, required: true}, givenName: {type: String, required: true}},
    date: { type: String, default: new Date().toLocaleString() },
});

module.exports = mongoose.model("GoogleUser", GoogleUserSchema);
