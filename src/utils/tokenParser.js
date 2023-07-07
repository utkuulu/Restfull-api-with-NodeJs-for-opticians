const tokenParser = (token) => {
    return token?.split("=")[1].split(";")[0];
  };
  
  module.exports = tokenParser;
  