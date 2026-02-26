import Navbar from "./Navbar";
import Dashboard from "../api/Dashboard";
export default function UserDashboard() {
  return (
    <>
      <div>
        <Navbar />
        <h2>User Panel</h2>
        <Dashboard />
      </div>
    </>
  );
}
