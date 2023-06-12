const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { connectDB, closeConnectionDB } = require("../config/db");
const User = require("../models/User.cjs");

router.post("/newsignup", async (req, res) => {
  const body = await req.body;
  const newEmail = body?.email;
  const newUsername = body?.username;
  const newPhone = body?.phone || "";
  const password = body?.password;
  await connectDB()
    .then(async () => {
      ///////////////////
      await User.findOne({ email: newEmail }).then((user) => {
        if (user) {
          return res.status(403).json({ email: "used" });
        }
      });
      await User.findOne({ username: newUsername }).then((user) => {
        if (user) {
          return res.status(403).json({ username: "used" });
        }
      });
      try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const NewUser = new User({
          email: newEmail,
          username: newUsername,
          phone: newPhone,
          password: hashedPassword,
          verified: 0,
          date: new Date().toLocaleString(),
        });
        NewUser.save();
      } catch (error) {
        console.log(error);
        res.json({ error: true });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: true });
    })
    .finally(() => {
      closeConnectionDB();
    });
});

module.exports = router;
