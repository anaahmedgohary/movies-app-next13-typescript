const mongoose = require("mongoose");

async function connectDB() {
  // const connect =
  await mongoose
    .connect(process.env.MONGODB_URI, {
      family: 4,
      serverApi: "1",
    })
    .then(() => {
      console.log("mongoose connected");
    })
    .catch((e) => {
      console.log("fail mongoose connection", e);
    });
}

async function closeConnectionDB() {
  // const disconnect =
  await mongoose
    .disconnect()
    .then(() => {
      console.log("mongoose disconnect");
    })
    .catch((e) => {
      console.log("fail mongoose disconnection", e);
    });
}

module.exports = { connectDB, closeConnectionDB };
