import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/all-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Admin Panel</h2>
      <h3>All Users:</h3>
      {users.map((user) => (
        <p key={user._id}>
          {user.name} - {user.email} - {user.role}
        </p>
      ))}
    </div>
  );
}
