const express = require("express");
const router = express.Router();
const { todoList } = require("../models/model.js");
const validateToken = require("../middleware/validateTokenHandle.js");

// Áp dụng middleware cho toàn endpont phía dưới
router.use(validateToken);

// Lấy tất cả các todolist của user thông qua user id
router.get("/getall/:id", async function (req, res) {
  try {
    const idUser = req.params.id;
    const allTodo = await todoList.find({ user: idUser });
    res.status(200).json(allTodo);
  } catch (error) {
    res.status(500).json(error);
  }
});

// thêm mới todolist
router.post("/addnew", async function (req, res) {
  try {
    // Tronng request gửi từ client cần 3 field user, name, isComplete
    const newTodo = new todoByUser(req.body);
    const saveTodo = await newTodo.save();
    res.status(200).json(saveTodo);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Cập nhật lại todo đó bằng id
router.patch("/update/:id", async (rq, res) => {
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

// xóa todo này khỏi data
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
