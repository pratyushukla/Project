require("dotenv/config");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const HttpError = require("../models/HttpError");
const url = process.env.DB_URL;

const client = new MongoClient(url);

const getQueries = async (req, res, next) => {
  let result;
  try {
    await client.connect();
    const database = client.db("userDB");
    const queries = database.collection("queries");
    result = await queries.find({}).toArray();
    if (result) res.json(result);
    else next(new HttpError("Not Found", 404));
  } catch {
    next(new HttpError("Not Found", 404));
  } finally {
    await client.close();
  }
};

const getQueriesByUserID = async (req, res, next) => {
  let result;
  try {
    await client.connect();
    const database = client.db("userDB");
    const queries = database.collection("queries");
    result = await queries.find({ userid: req.params.userid }).toArray();
    if (result) res.json(result);
    else next(new HttpError("Not Found", 404));
  } catch {
    next(new HttpError("Not Found", 404));
  } finally {
    await client.close();
  }
};

const getQueryByID = async (req, res, next) => {
  let result;
  const queryID = req.params.queryid;
  try {
    await client.connect();
    const database = client.db("userDB");
    const queries = database.collection("queries");
    result = await queries.findOne({
      _id: ObjectId(queryID),
    });
    if (result) res.json(result);
    else next(new HttpError("Not Found", 404));
  } catch {
    next(new HttpError("Not Found", 404));
  } finally {
    await client.close();
  }
};

const getCommentsByQuery = async (req, res, next) => {
  let result;
  try {
    await client.connect();
    const database = client.db("userDB");
    const queries = database.collection("comments");
    result = await queries.find({ queryid: req.params.queryid }).toArray();
    if (result) res.json(result);
    else next(new HttpError("Not Found", 404));
  } catch {
    next(new HttpError("Not Found", 404));
  } finally {
    await client.close();
  }
};

module.exports = {
  getQueries,
  getQueriesByUserID,
  getQueryByID,
  getCommentsByQuery,
};
