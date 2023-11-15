const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

// execute express
const app = express();
// Middlewares
app.use(express.json());
app.use(cors());

// Get all tasks
app.get("/todo/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).send(err);
  }
});

// Create a new Task
app.post("/todo/new", async (req, res) => {
  try {
    const newTask = await Todo.create(req.body);
    res.status(201).json(newTask); // 201 indicating console.l!og(successful creation
    console.log(res.json(newTask));
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a task
app.delete("/todo/delete/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

const connectionString =
  "mongodb+srv://admin:1234@cluster0.x8d1lyy.mongodb.net/todoapp?retryWrites=true&w=majority";
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to the database...");
    const port = 4001;
    app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  })
  .catch((err) => console.error("Connection error:", err));
