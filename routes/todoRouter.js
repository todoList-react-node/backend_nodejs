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

router.patch("/complete/:id", async (rq, res) => {
  try {
    const { id } = rq.params;
    const allTodo = await todoList.findOneAndUpdate({ _id: id }, rq.body, {
      new: true,
    });
    res.status(201).json(allTodo);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/delete/:id", async (rq, res) => {
  try {
    const { id } = rq.params;
    const deleteTodo = await todoList.deleteOne({ _id: id });
    res.send(deleteTodo);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
