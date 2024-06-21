const { user } = require("../models/model.js");
const bcrypt = require("bcrypt");

const authLogin = async (rq, res, next) => {
  // Username
  const findUser = await user.findOne({
    userName: rq.body.userName,
  });
  console.log(findUser);
  if (findUser === null) {
    console.log("account not found", findUser);
    res.send("account not found!");
  } else {
    rq.user = findUser;
    next();
  }
};

module.exports = authLogin;
