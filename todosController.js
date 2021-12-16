const createError = require("http-errors");
const ObjectId = require("mongodb").ObjectId;
const { Todo } = require("./models/todos");
//let todoList = []
//let idno = 0

exports.index = async function (req, res) {
  Todo.find().then((todos) => res.send(todos));
};

exports.create = async function (req, res, next) {
  if (!req.body.author) {
    return next(createError(400, "author is required"));
    
  }

  const todo = new Todo({
    author: req.body.author,
    Title: req.body.Title,
    status: req.body.status,
    
  });
  console.log(Todo)
  todo.save().then(() => res.send({ result: true }));
};

exports.show = async function (req, res, next) {
  Todo.findOne({ _id: ObjectId(req.params.id) }).then((todoItem) => {
    if (!todoItem) {
      return next(createError(404, "no book with that id"));
    }
    res.send(todoItem);
  });
};

exports.update = async function (req, res, next) {
  Todo.findOne({ _id: ObjectId(req.params.id) }).then((todoItem) => {
    if (!todoItem) {
      return next(createError(404, "no book with that id"));
    }

    todoItem.author = req.body.author;
    todoItem.Title = req.body.Title;
    todoItem.status = req.body.status;
    todoItem.save().then(() => res.send({ result: true }));
  });
};

exports.delete = function (req, res, next) {
  Todo.deleteOne({ _id: ObjectId(req.params.id) })
    .then((r) => {
      if (r.deletedCount) {
        return res.send({ result: true });
      }
      return next(createError(404, "no book with that id"));
    })
    .catch((err) => console.log(err));
};
