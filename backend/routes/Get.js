require("dotenv/config");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const HttpError = require("../models/HttpError");
const url = process.env.DB_URL;

const client = new MongoClient(url);

const getUserByID = async (req, res, next) => {
  let result;
};

module.exports = {
  getUserByID,
};
