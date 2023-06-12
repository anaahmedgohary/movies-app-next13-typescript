const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  phone: { type: String, default: "" },
  password: { type: String, required: true },
  verified: { type: Number, enum: [0, 1], default: 0 },
  date: { type: String, default: new Date().toLocaleString() },
});

module.exports = mongoose.model("User", UserSchema);
