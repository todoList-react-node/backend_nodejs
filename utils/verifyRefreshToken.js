const jwt = require("jsonwebtoken");
const { UserToken } = require("../models/model.js");
const dotEnv = require("dotenv");
dotEnv.config();

const verifyRefreshToken = (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
  return new Promise((resolve, reject) => {
    const getUserByToken = UserToken.findOne({ token: refreshToken });
    if (!getUserByToken) {
      reject({ error: true, message: "Token not found" });
    }
    jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
      if (err) {
        console.log("token err");
        reject({ error: true, message: "Invalid refresh token" });
      }
      resolve({
        tokenDetails,
        error: false,
        message: "Valid refresh token",
      });
    });
  });
};

module.exports = verifyRefreshToken;
