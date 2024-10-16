import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import UserPage from "./pages/UserPage";
import ServicePage from './pages/ServicePage'; 
import TechnicianDashboard from './pages/TechnicianDashboard'; // Import TechnicianDashboard
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : user.role === "user" ? (
                <Navigate to="/user" />
              ) : user.role === "technician" ? (
                <Navigate to="/technician" />
              ) : (
                <LandingPage />
              )
            ) : (
              <Login setUser={setUser} />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/user"
          element={
            user && user.role === "user" ? (
              <UserPage user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/service"
          element={
            user && user.role === "user" ? (
              <ServicePage user={user} setUser={setUser}/>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/technician"
          element={
            user && user.role === "technician" ? (
              <TechnicianDashboard onLogout={handleLogout} user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
