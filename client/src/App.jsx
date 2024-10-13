import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Load user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false); // Set loading to false once user is retrieved
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user from localStorage
    setUser(null); // Update user state
  };

  if (loading) {
    // Display a loading indicator while checking user state
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user.role === 'admin' ? (
                <Navigate to="/admin" />
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
          element={user && user.role === 'admin' ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
