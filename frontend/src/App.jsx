import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminRoute from "./Routes/AdminRoutes";
import AdminDashboard from "./components/AdminDashboard";
import Dashboard from "./components/Dashboard";
import PageDemo from "./page/PageDemo";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<PageDemo />}></Route>

      {/* USER ACCESS */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ADMIN ACCESS */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
