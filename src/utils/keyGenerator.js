const uniqueKeyGenerator = (length = process.env.RANDOM_KEY_LENGTH || 11) => {
  var result = "";
  var characters = process.env.RANDOM_KEY_CHARACTERS;
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {
  uniqueKeyGenerator,
};
