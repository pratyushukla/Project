require("dotenv/config");
const { MongoClient, ObjectID } = require("mongodb");
const HttpError = require("../models/HttpError");
const url = process.env.DB_URL;

const client = new MongoClient(url);

const updateUser = async (req, res, next) => {
  const email = req.body.auth.email;
  let response;
  try {
    await client.connect();
    const database = client.db("userDB");
    const userData = database.collection("userData");
    isExist = await userData.findOne({
      auth: { email: email },
    });
    console.log("found");
    const updateUser = req.body;
    delete updateUser._id;
    response = await userData.replaceOne(
      { "auth.email": email },
      { ...updateUser },
      { returnNewDocument: true }
    );
    response = await userData.findOne({
      "auth.email": email,
    });
    console.log(`A document was updated with the _id: ${response._id}`);
    res.json(response);
  } finally {
    await client.close();
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

module.exports = { updateUser, postComment };
