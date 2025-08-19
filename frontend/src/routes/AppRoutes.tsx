import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import StoreList from "../pages/StoreList";
import AdminDashboard from "../pages/AdminDashboard";
import OwnerDashboard from "../pages/OwnerDashboard";

export default function AppRoutes() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {token ? (
        <>
          <Route path="/stores" element={<StoreList />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/owner" element={<OwnerDashboard />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}
