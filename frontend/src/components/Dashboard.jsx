import React, { useEffect, useState } from "react";
import instance from "../api/axios";
import { toast } from "react-toastify";
import { handleError } from "../utils/ErrorHandler";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getTaskPriority } from "../Ai/priorityai.js";
import Deadline2 from "../Ai/Deadline.js";
import { productivityScore } from "../Ai/Productivity.js";
import { getPriority } from "../Ai/getpriority.js";
import { getSuggestion } from "../Ai/Suggestionai.js";
import { getWeeklyStats } from "../Ai/analyticsAI.js";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [Score, setScore] = useState(0);
  const [suggestion, setSuggestion] = useState("");
  const [weeklyData, setWeeklyData] = useState(null);
  const { logout } = useContext(AuthContext);

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
      setScore(productivityScore(res.data));
      setSuggestion(getSuggestion(res.data, productivityScore(res.data)));
      setWeeklyData(getWeeklyStats(res.data));
      toast.success("Tasks fetched successfully");
    } catch (err) {
      toast.error(handleError(err));
    }
    setLoading(false);
  };

  const addTask = async () => {
    setLoading(true);
    try {
      const aiPriority = await getTaskPriority(title);
      const Deadline = await Deadline2(title);
      await instance.post("/tasks/add", {
        title,
        status: aiPriority,
        deadline: Deadline,
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
      <div
        style={{
          maxWidth: "600px",
          margin: "40px auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          fontFamily: "Arial",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Task Manager</h2>

        {/* Add Task Section */}
        <div style={{ marginBottom: "20px" }}>
          <h3>Add Task</h3>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            disabled={loading}
            onClick={addTask}
            style={{
              width: "48%",
              padding: "10px",
              marginRight: "4%",
              background: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>

          <button
            onClick={getTasks}
            style={{
              width: "48%",
              padding: "10px",
              background: "#2196F3",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Get Tasks
          </button>
        </div>

        {/* Logout */}
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <Link to="/logout">
            <button
              onClick={logout}
              style={{
                padding: "8px 15px",
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Logout
            </button>
          </Link>
        </div>

        {/* Task List */}
        <h3>My Tasks</h3>

        {loading && <p>Loading Tasks...</p>}

        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task._id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h2>Productivity Score: {Score}%</h2>
                <p>Priority: {getPriority(task.deadline, task.title)}</p>
                <p>{suggestion}</p>
                <p>
                  <strong>{task.title}</strong>
                </p>
                <p>Status: {task.status}</p>
                {weeklyData && (
                  <Bar
                    data={{
                      labels: weeklyData.labels,
                      datasets: [
                        {
                          label: "Completed Tasks",
                          data: weeklyData.data,
                        },
                      ],
                    }}
                  />
                )}
              </div>

              <div>
                <select
                  value={task.status}
                  onChange={(e) => updateTask(task._id, e.target.value)}
                  style={{ marginRight: "10px" }}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <p>Deadline: {task.deadline?.split("T")[0]}</p>
                <button
                  onClick={() => deleteTask(task._id)}
                  style={{
                    padding: "5px 10px",
                    background: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Delete
                </button>
              </div>
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
