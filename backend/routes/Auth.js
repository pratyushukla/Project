require("dotenv/config");
const { MongoClient } = require("mongodb");
const HttpError = require("../models/HttpError");
const url = process.env.DB_URL;

const client = new MongoClient(url);

const userSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const phone = req.body.phone;
  let isExist;
  let response;
  try {
    await client.connect();
    const database = client.db("userDB");
    const authData = database.collection("authData");
    const userData = database.collection("userData");
    isExist = await userData.findOne({
      email: email,
      password: password,
    });
    if (!isExist) {
      const result = await authData.insertOne(req.body);
      const newUser = {
        authID: result.insertedId,
        profile: {
          name: name,
          phone: phone,
          email: email,
          address: "",
          description: "",
        },
        education: [{ course: "", institution: "", year: "", marks: "" }],
        projects: [{ title: "", date: "", description: "" }],
        skills: "",
        experience: [],
        achivements: [],
        certificates: [],
        languages: [],
        interest: [],
      };
      await userData.insertOne(newUser);
      response = await userData.findOne({
        "profile.email": email,
      });
      console.log(response);
      console.log(`User Created`);
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
  let isExist;
  let response;
  try {
    await client.connect();
    const database = client.db("userDB");
    const authData = database.collection("authData");
    const userData = database.collection("userData");
    isExist = await authData.findOne({
      email: email,
      password: password,
    });
    if (isExist) {
      response = await userData.findOne({
        "profile.email": email,
      });
    } else next(new HttpError("Invalid Credentials", 404));
    console.log(response);
    if (response != null) res.status(200).json(response);
  } finally {
    await client.close();
  }
};

module.exports = { userSignup, userLogin };
