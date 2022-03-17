const express = require("express");
const bodyParser = require("body-parser");
require("dotenv/config");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

const { userLogin, userSignup } = require("./routes/Auth.js");
const { updateUser } = require("./routes/Post.js");
const { getUserByID } = require("./routes/Get.js");

const options = { ordered: true };

app.get("/", (req, res, next) => {
  res.send("<a href='http://localhost:3000'>Go to frontend</a>");
});

app.post("/api/signup", userSignup);
app.post("/api/login", userLogin);
app.post("/api/update", updateUser);

app.get("/api/user", getUserByID);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000);
