import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { handleError } from "../utils/ErrorHandler.js";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email: form.email,
        password: form.password,
        role: form.role,
      });
      login(res.data.token);
      toast.success("Login successful");
    } catch (err) {
      toast.error(handleError(err));
    }
    // if (!form.role) {`
    //   alert("Select role");
    //   return;
    // }

    if (form.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/user", { replace: true });
    }
    setLoading(false);
  };
  const inputStyle = {
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #667eea, #764ba2)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={inputStyle}
        />

        <select name="role" onChange={handleChange} style={inputStyle}>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        {Loading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            style={{
              padding: "12px",
              marginTop: "10px",
              background: "#667eea",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Login
          </button>
        )}
      </form>
    </div>
  );
}
