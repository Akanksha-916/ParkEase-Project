import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import UserAuth from "./components/Auth/UserAuth";
import AdminAuth from "./components/Auth/AdminAuth";

/* -------- OWNER IMPORTS -------- */
import OwnerLayout from "./components/owner/OwnerLayout";
import OwnerDashboard from "./components/owner/OwnerDashboard";
import OwnerAuth from "./components/Auth/OwnerAuth.jsx";
import ManageSpaces from "./components/owner/ManageSpaces";
import Booking from "./components/owner/Booking";
import Earning from "./components/owner/Earning";
import OwnerSidebar from "./components/owner/OwnerSidebar";
import OwnerProfile from "./components/owner/Profileowner.jsx";

/* -------- USER IMPORTS -------- */

import UserLayout from "./components/User/UserLayout";
import UserDashboard from "./components/User/UserDashboard";
import Parking from "./components/User/Parking";
import Reserve from "./components/User/Reserve";
import Payments from "./components/User/Payments";
import Profile from "./components/User/Profile";

/* -------- ADMIN IMPORTS -------- */
import AdminDashboard from "./components/Admin/AdminDashboard";
import Sidebar from "./components/Admin/Sidebar";
import ParkingManagement from "./components/Admin/ParkingManagement";
import UserManagement from "./components/Admin/UserManagement";
import Activitylogs from "./components/Admin/Activitylogs";
import Pricing from "./components/Admin/Pricing";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-auth" element={<UserAuth />} />
        <Route path="/admin-auth" element={<AdminAuth />} />
        <Route path="/owner-auth" element={<OwnerAuth />} />

        {/* ================= USER ================= */}
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
          <Route path="reservation" element={<Reserve />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roleRequired="admin">
              <Sidebar />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="parking-management" element={<ParkingManagement />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="activity-logs" element={<Activitylogs />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>

        {/* ================= OWNER ================= */}
        <Route path="/owner" element={<OwnerLayout />}>

        <Route path="dashboard" element={<OwnerDashboard />} />
        <Route path="spaces" element={<ManageSpaces />} />
        <Route path="bookings" element={<Booking />} />
        <Route path="earnings" element={<Earning />} />
        <Route path="profileowner" element={<OwnerProfile />} />  

</Route>
      </Routes>
    </Router>
  );
}

export default App;