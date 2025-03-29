const express = require("express");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const Port = process.env.PORT || 5000;

const authRoute = require("./api/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", authRoute);

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "Detected" : "Not detected"
);

app.listen(Port, "0.0.0.0", () => {
  console.log(["Info"], `Server started on port ${Port}`);
});
