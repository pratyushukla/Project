require("dotenv/config");
const { MongoClient } = require("mongodb");
const HttpError = require("../models/HttpError");
const url = process.env.DB_URL;

const client = new MongoClient(url);

const userSignup = async (req, res, next) => {
  const email = req.body.auth.email;
  const password = req.body.auth.password;
  let isExist;
  let response;
  try {
    await client.connect();
    const database = client.db("userDB");
    const userData = database.collection("userData");
    isExist = await userData.findOne({
      auth: { email: email, password: password },
    });
    if (!isExist) {
      const result = await userData.insertOne(req.body);
      response = await userData.findOne({
        auth: { email: email, password: password },
      });
      console.log(response);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    }
    if (isExist) {
      next(new HttpError("Email already exists", 403));
    } else {
      res.json(response);
    }
  } finally {
    await client.close();
  }
};

const userLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let result;
  try {
    await client.connect();
    const database = client.db("userDB");
    const userData = database.collection("userData");
    result = await userData.findOne({
      auth: { email: email, password: password },
    });
    console.log("result" + result);
    if (result != null) res.status(200).json(result);
    else next(new HttpError("Invalid Credentials", 404));
  } finally {
    await client.close();
  }
};

module.exports = { userSignup, userLogin };
