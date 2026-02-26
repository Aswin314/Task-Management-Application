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

    // ROLE BASED NAVIGATION (DAY 13)
    // if (form.role === "admin") {
    //   navigate("/admin", { replace: true });
    // } else {
    //   navigate("/user", { replace: true });
    // }

    // const expiryTime = Date.now() + 60000;
    // Login(res.data.token, form.role);
    // localStorage.setItem("expiryTime", expiryTime);
    // localStorage.setItem("refreshToken", refreshToken);
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input name="email" placeholder="Email" onChange={handleChange} />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <select name="role" onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>

      {Loading ? <Loader /> : <button type="submit">Login</button>}
    </form>
  );
}
