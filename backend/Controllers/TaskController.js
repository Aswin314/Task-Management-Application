import mongoose from "mongoose";
import Task from "../models/TaskModels.js";

export const CreateTask = async (req, res) => {
  const { title, status, deadline } = req.body;
  const task = new Task({
    title: req.body.title,
    status: req.body.status,
    user: req.user.id,
    deadline: req.body.deadline,
  });
  await task.save();
  res.json("Task Created");
};

export const allTasks = async (req, res) => {
  const task = await Task.find();
  res.json(task);
};
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
    });
  }
};
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: new mongoose.Types.ObjectId(req.user.id),
      },
      req.body,
      { new: true },
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found or unauthorized",
      });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
    });
  }
};
