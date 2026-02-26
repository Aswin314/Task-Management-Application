import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function AxiosUsers() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };
  return (
    <>
      <h2>Axios Users</h2>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
