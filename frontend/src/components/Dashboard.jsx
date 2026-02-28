import React, { useEffect, useState } from "react";
import instance from "../api/axios";
import { toast } from "react-toastify";
import { handleError } from "../utils/ErrorHandler";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await instance.get("/tasks/myTasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
      toast.success("Tasks fetched successfully");
    } catch (err) {
      toast.error(handleError(err));
    }
    setLoading(false);
  };

  const addTask = async () => {
    setLoading(true);
    try {
      await instance.post("/tasks/add", {
        title,
        status,
      });
      getTasks();
      setTitle("");
      toast.success("Task added successfully");
    } catch (err) {
      toast.error(handleError(err));

    }
    setLoading(false);
  };

  const updateTask = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");

      await instance.put(
        `/tasks/${id}`,
        { status: updatedData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      getTasks();
      toast.success("Task updated successfully");
    } catch (err) {
      toast.error(handleError(err));
  
    }
  };
  const deleteTask = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      await instance.delete(`/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getTasks();
      toast.success("Task deleted successfully");
    } catch (err) {
      toast.error(handleError(err));
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <>
      <div>
        <h3>Add Task</h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button disabled={loading} onClick={addTask}>
          Add Task
        </button>
        <button onClick={getTasks}>Get Tasks</button>

        <h2>My Tasks</h2>
        {loading && <h3>Loading Tasks...</h3>}
        {/* {!loading && tasks.length === 0 && (
          <h3>No tasks yet. Add your first task.</h3>
        )} */}

        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px",
                borderRadius: "8px",
              }}
            >
              <p>{task.title}</p>

              <select
                value={task.status}
                onChange={(e) => updateTask(task._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <p>Status: {task.status}</p>

              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
