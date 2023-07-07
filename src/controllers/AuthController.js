const expressAsyncHandler = require("express-async-handler");
const {
  signUpService,
  signInService,
  getProfileService,
} = require("../services/AuthServices");
const user = require("../models/User");
const { createToken } = require("../utils/jwtGenerator");

class AuthController {
  static signUp = expressAsyncHandler(async (req, res) => {
    const {
      email,
      password,
      username,
      displayName = "",
      bio = "",
      location = "",
      websiteUrl = "",
      telNo = "",
      showActivityStatus = false,
      verifiedType,
    } = req.body;

    const token = await createToken({
      email,
      verifiedType,
      expireDate: Date.now() + process.env.JWT_SECRET,
    });

    const response = await signUpService({
      email,
      password,
      username,
      displayName,
      bio,
      location,
      websiteUrl,
      telNo,
      showActivityStatus,
      verifiedType,
    });

    res
      .cookie("token", token, { maxAge: process.env.EXPIRE_TIME })
      .json({ response, token });
  });

  static signIn = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const response = await signInService({ email, password });

    const token = createToken({
      email,
      verifiedType: response.data.fields.verifiedType,
      expireDate: Date.now() + process.env.EXPIRE_TIME,
    });

    res
      .cookie("token", token, { maxAge: process.env.EXPIRE_TIME })
      .json({ response, token });
  });

  static logout = expressAsyncHandler(async (req, res) => {
    return res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logout Successfull",
      });
  });

  static getProfile = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;

    const response = await getProfileService({ email });

    res.json(response);
  });
}

module.exports = AuthController;
