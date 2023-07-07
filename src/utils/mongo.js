const { DB_HOST, DB_NAME } = process.env;

const Mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const db = Mongoose.connection;

db.once("open", () => {
  console.log("DB connection success.");
});

const connectMongo = async () => {
  const mongooseConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await Mongoose.connect(`${DB_HOST}/${DB_NAME}`, mongooseConfig);
};

module.exports = {
  connectMongo,
};
