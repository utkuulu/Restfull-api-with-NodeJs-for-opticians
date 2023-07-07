const express = require("express");
const authRouter = require("./auth.router");
const ErrorHandler = require("../error/ErrorHandler");
const glassesRouter = require("./glasses.router");
const eyeGlassLensRouter = require("./eyeGlassLens.router");
const customerRouter = require("./customer.router");

const indexRouter = express.Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/glasses", glassesRouter);
indexRouter.use("/eyeglassLens", eyeGlassLensRouter);
indexRouter.use("/customer", customerRouter);

indexRouter.use(ErrorHandler);

module.exports = indexRouter;
