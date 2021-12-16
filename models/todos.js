const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  author: String,
  Title: String,
  status: String,
});

module.exports.Todo = mongoose.model("book", todoSchema, "todo");
