require("dotenv/config");
const { MongoClient } = require("mongodb");
const HttpError = require("../models/HttpError");
const url = process.env.DB_URL;

const client = new MongoClient(url);

const postQuery = async (req, res, next) => {
  let isExist;
  let response;
  try {
    await client.connect();
    const database = client.db("userDB");
    const queries = database.collection("queries");
    const users = database.collection("users");
    isExist = await queries.findOne({ query: req.body.query });
    if (!isExist) {
      const result = await queries.insertOne(req.body);
      response = await queries.findOne({ email: req.body.email });
      await users.findOneAndUpdate(
        { email: req.body.email },
        { $push: { queries: response._id } }
      );
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    }
  } finally {
    await client.close();
  }
  if (isExist) {
    next(new HttpError("Query already exists", 403));
    // res.json({ message: "Email already exists" });
  } else {
    res.json(response);
  }
};

const postComment = async (req, res, next) => {
  let isExist;
  let response;
  try {
    await client.connect();
    const database = client.db("userDB");
    const queries = database.collection("comments");
    const users = database.collection("users");
    isExist = await queries.findOne({ query: req.body.comment });
    if (!isExist) {
      const result = await queries.insertOne(req.body);
      response = await queries.findOne({ email: req.body.email });
      await users.findOneAndUpdate(
        { email: req.body.email },
        { $push: { comments: response._id } }
      );
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    }
  } finally {
    await client.close();
  }
  if (isExist) {
    next(new HttpError("Comment already exists", 403));
    // res.json({ message: "Email already exists" });
  } else {
    res.json(response);
  }
};

module.exports = { postQuery, postComment };
