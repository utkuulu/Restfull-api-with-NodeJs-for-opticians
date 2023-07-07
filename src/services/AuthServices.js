const CustomError = require("../error/CustomError");
const user = require("../models/User");

const signUpService = async ({
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
  }) => {
    const previousUserByEmail = await user.findOne({ email });
    const previousUserByUsername = await user.findOne({ username });
  
    if (previousUserByEmail) {
      throw new CustomError({
        status: 400,
        message: "There is a user with that email",
      });
    }
  
    if (previousUserByUsername) {
      throw new CustomError({
        status: 400,
        message: "There is a user with that username",
      });
    }
  
    const newUser = new user({
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
  
    await newUser.save();
  
    return { success: true, data: newUser };
  };

  const signInService = async ({ email, password }) => {
    const signInUser = await user.findOne({ email }).select("+password");
  
    if (!signInUser) {
      throw new CustomError({
        status: 404,
        message: "There is no user with that email",
      });
    }
  
    if (!signInUser.comparePassword(password)) {
      throw new CustomError({ status: 400, message: "Password missmatch!" });
    }
  
    return { success: true, data: signInUser };
  };
  
  const getProfileService = async ({ email }) => {
    const getUser = await user.findOne({ email });
  
    if (!getUser) {
      throw new CustomError({
        status: 404,
        message: "There is no user with that email",
      });
    }
  
    return { success: true, data: getUser };
  };
  
  
  module.exports = {
    signUpService,
    signInService,
    getProfileService,
  };
  
  