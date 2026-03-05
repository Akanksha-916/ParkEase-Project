import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import UserAuth from "./components/Auth/UserAuth";
import AdminAuth from "./components/Auth/AdminAuth";

import UserLayout from "./components/User/UserLayout";
import UserDashboard from "./components/User/UserDashboard";
import Parking from "./components/User/Parking";
 // ✅ correct
import Reserve from "./components/User/Reserve";
import Payments from "./components/User/Payments";
import Profile from "./components/User/Profile";

import AdminDashboard from "./components/Admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/user-auth" element={<UserAuth />} />
        <Route path="/admin-auth" element={<AdminAuth />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roleRequired="user">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="parking" element={<Parking />} />
          <Route path="reservation" element={<Reserve />} />  {/* ✅ */}
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;