const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { ServerConfig } = require("../../config");

function checkPassword(myPlaintextPassword, encryptedPassword) {
  try {
    const result = bcrypt.compareSync(myPlaintextPassword, encryptedPassword);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function generateJWT(data) {
  try {
    const token = jwt.sign(data, ServerConfig.JWT_SECRET_KEY, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = { checkPassword,generateJWT };
