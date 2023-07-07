require("dotenv").config();
const { connectMongo } = require("./utils/mongo");
const { app } = require("./server");
const indexRouter = require("./routers/index.router");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(indexRouter);

connectMongo();
