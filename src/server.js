const { APP_PORT } = process.env;

const express = require("express");

const app = express();

const server = app.listen(APP_PORT, () => {
  console.log(
    `SERVER ONLINE ON PORT => ${APP_PORT} -- version: ${process.env.NODE_ENV}`
  );
});

module.exports = {
  server,
  app,
};
