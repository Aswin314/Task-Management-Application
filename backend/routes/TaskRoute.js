import express from "express";
import {
  allTasks,
  CreateTask,
  deleteTask,
  // getTask,
  updateTask,
} from "../Controllers/TaskController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const TaskRouter = express.Router();

TaskRouter.post("/add", verifyToken, CreateTask);
TaskRouter.get("/myTasks", allTasks);
// TaskRouter.get("/task", getTask);
TaskRouter.delete("/:id", verifyToken, deleteTask);
TaskRouter.put("/:id", verifyToken, updateTask);

export default TaskRouter;
