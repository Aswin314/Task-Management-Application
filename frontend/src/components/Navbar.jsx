import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {user?.role === "admin" && <Link to="/admin">Admin</Link>}

      {user && <button onClick={handleLogout}>Logout</button>}
    </div>
  );
}
