const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

const createToken = (data) => {
  return jwt.sign(data, secretKey);
};

const decodeToken = (data) => {
  return jwt.decode(data, secretKey);
};

module.exports = {
  createToken,
  decodeToken,
};
