import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FormPage = () => {
  const [form, setForm] = useState({ email: "", password: "", role: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    localStorage.setItem("role", e.target.value);
    if (e.target.value === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  };
  return (
    <div>
      <h1>Form</h1>
      <select name="role" onChange={handleChange}>
        <option value="">Select Role</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
  );
};

export default FormPage;
