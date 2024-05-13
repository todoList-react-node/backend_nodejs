const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "todoList",
    },
  ],
});

let todoList = mongoose.model("todoList", todoSchema);
let user = mongoose.model("user", userSchema);

module.exports = { todoList, user };
