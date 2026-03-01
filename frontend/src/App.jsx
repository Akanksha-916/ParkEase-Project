import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import UserAuth from "./components/Auth/UserAuth";
import AdminAuth from "./components/Auth/AdminAuth";

import UserDashboard from "./punith/UserDashboard.jsx";
import AdminDashboard from "./punith/AdminDashboard.jsx";

import Parking from "./punith/Parking.jsx";
import Reservation from "./punith/Reservation.jsx";
import UserLayout from "./punith/UserLayout";
import Profile from "./punith/Profile.jsx";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-auth" element={<UserAuth />} />
        <Route path="/admin-auth" element={<AdminAuth />} />
        <Route path="/dashboard" element={<UserLayout />}>
          
          {/* ✅ Default page when visiting /dashboard */}
          <Route index element={<UserDashboard />} />
          {/* Other nested routes */}
            

        </Route>

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute roleRequired="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* User Pages */}
        <Route
          path="/Parking"
          element={
            <ProtectedRoute roleRequired="user">
              <Parking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Reservation"
          element={
            <ProtectedRoute roleRequired="user">
              <Reservation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Profile"
          element={
            <ProtectedRoute roleRequired="user">
              <Profile/>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>


  );
}

export default App;