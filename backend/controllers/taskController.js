const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {

  try {

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      userId: req.user.id
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// GET ALL TASKS
exports.getTasks = async (req, res) => {

  try {

    const tasks = await Task.find({
      userId: req.user.id
    });

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// UPDATE TASK
exports.updateTask = async (req, res) => {

  try {

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// DELETE TASK
exports.deleteTask = async (req, res) => {

  try {

    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
