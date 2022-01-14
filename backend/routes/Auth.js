require("dotenv/config");
const { MongoClient } = require("mongodb");
const HttpError = require("../models/HttpError");
const url = process.env.DB_URL;

const client = new MongoClient(url);

const userSignup = async (req, res, next) => {
  let isExist;
  let response;
  try {
    await client.connect();
    const database = client.db("userDB");
    const students = database.collection("authData");
    isExist = await students.findOne({ email: req.body.email });
    if (!isExist) {
      const result = await students.insertOne(req.body);
      response = await students.findOne({ email: req.body.email });
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    }
  } finally {
    await client.close();
  }
  if (isExist) {
    next(new HttpError("Email already exists", 403));
    // res.json({ message: "Email already exists" });
  } else {
    res.json(response);
  }
};

const userLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let result;
  try {
    await client.connect();
    const database = client.db("userDB");
    const students = database.collection("authData");
    result = await students.findOne({ email: email, password: password });
    console.log("result" + result);
  } finally {
    await client.close();
  }
  if (result != null) res.status(200).json(result);
  else next(new HttpError("Invalid Credentials", 404));
};

module.exports = { userSignup, userLogin };
