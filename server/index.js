const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
require("dotenv").config();

app.use(express.json());
app.use("/api/v1", require("./src/v1/routes/auth"));

//DB connection
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("connecting to DB");
} catch (error) {
  console.log(error);
}
//user login API

app.listen(PORT, () => {
  console.log("starting local server...");
});
