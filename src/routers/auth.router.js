const express = require("express");
const authController = require("../controllers/AuthController");
const authRouter = express.Router();

authRouter.route("/sign-up").post(authController.signUp);
authRouter.route("/sign-in").post(authController.signIn);
authRouter.route("/logout").post(authController.logout);
authRouter.route("/get-profile").post(authController.getProfile);

module.exports = authRouter;
