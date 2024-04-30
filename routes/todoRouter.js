const express = require("express");
const router = express.Router();
const { todoList } = require("../models/model.js");

// Home page route.
router.get("/getall", async function (req, res) {
  try {
    const allTodo = await todoList.find();
    res.status(200).json(allTodo);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/addnew", async function (req, res) {
  try {
    const newTodo = new todoList(req.body);
    const saveTodo = await newTodo.save();
    res.status(200).json(saveTodo);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/complete", (rq, res) => {
  res.send("updtae successful");
});

module.exports = router;
