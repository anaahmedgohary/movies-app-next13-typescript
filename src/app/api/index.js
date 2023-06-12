const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { connectDB } = require("./config/db.js");

//////////
/////////

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
connectDB();
/////////
app.get("/api", (req, res) => {
  console.log("simple check req");
  res.send("hellos");
});
/////////

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});
