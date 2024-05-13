const express = require("express");
const router = express.Router();
const { user } = require("../models/model.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
// providing process to join the env file
const dotEnv = require("dotenv");
const validateToken = require("../middleware/validateTokenHandle.js");
dotEnv.config();
// ending

// login with current account
router.post("/login", async (rq, res) => {
  try {
    const findUserName = await user.findOne({ userName: rq.body.userName });
    const isSamePass = await bcrypt.compare(
      rq.body.password,
      findUserName.password
    );
    if (!findUserName) {
      res.send("Account not found");
    }
    if (!isSamePass) {
      res.send("Password not correct");
    }
    // providing access token by get the pass and userName
    const aceessToken = jwt.sign(
      {
        user: {
          id: findUserName._id,
          userName: findUserName.userName,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    res.status(200).json({ aceessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

// register new account
router.post("/register", async (rq, res) => {
  try {
    const data = {
      userName: rq.body.userName,
      password: rq.body.password,
    };
    // Check if name user is already have
    const exitUserName = await user.findOne({ userName: data.userName });
    if (exitUserName) {
      res.send("User already taken");
    } else {
      // if not the system will hash the password and pass to the collection in mongodb
      const hashPassword = await bcrypt.hash(data.password, 10);
      data.password = hashPassword;
      const newAccount = new user(data);
      const saveUser = await newAccount.save();
      res.status(204).json(saveUser);
    }
  } catch (error) {
    res.status(500, "Sever error");
  }
});

// get all user in system
router.get("/getall", async (rq, res) => {
  try {
    const allUser = await user.find();
    res.status(200).json(allUser);
  } catch (error) {
    res.status(500).send("There are some problem in server");
  }
});

// Check current user with middleware
router.get("/current", validateToken, async (rq, res) => {
  res.status(200).send(rq.user);
});

module.exports = router;
