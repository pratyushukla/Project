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
const { postQuery, postComment } = require("./routes/Post.js");
const {
  getQueries,
  getQueriesByUserID,
  getQueryByID,
  getCommentsByQuery,
} = require("./routes/Get.js");

const options = { ordered: true };

app.get("/", (req, res, next) => {
  res.send("<a href='http://localhost:3000'>Go to frontend</a>");
});

app.post("/api/signup", userSignup);
app.post("/api/login", userLogin);
app.post("/api/postquery", postQuery);
app.post("/api/postcomment", postComment);

app.get("/api/queries", getQueries);
app.get("/api/queries/:userid", getQueriesByUserID);
app.get("/api/query/:queryid", getQueryByID);
app.get("/api/comments/:queryid", getCommentsByQuery);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000);
