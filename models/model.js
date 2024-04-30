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
});

let todoList = mongoose.model("todoList", todoSchema);

module.exports = { todoList };
