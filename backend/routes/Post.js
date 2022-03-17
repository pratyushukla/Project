require("dotenv/config");
const { MongoClient, ObjectID } = require("mongodb");
const HttpError = require("../models/HttpError");
const url = process.env.DB_URL;

const client = new MongoClient(url);

const updateUser = async (req, res, next) => {
  const email = req.body.profile.email;
  let response;
  try {
    await client.connect();
    const database = client.db("userDB");
    const userData = database.collection("userData");
    isExist = await userData.findOne({
      "profile.email": email,
    });
    console.log("found");
    const updateUser = req.body;
    delete updateUser._id;
    response = await userData.replaceOne(
      { "profile.email": email },
      { ...updateUser },
      { returnNewDocument: true }
    );
    response = await userData.findOne({
      "profile.email": email,
    });
    console.log(`A document was updated with the _id: ${response._id}`);
    res.json(response);
  } finally {
    await client.close();
  }
};

module.exports = { updateUser };
