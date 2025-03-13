import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import AddProduct from "./AddProduct";
import { handleAuthError, useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // assum admin email (You can modify anything) : admin@gmail.com
  const isAdmin = currentUser?.email === "admin@gmail.com";

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      alert("Failed to logout");
    }
  }

  return (
    <div>
      <h1>My Website</h1>

      <h1>dashboard</h1>

      <button onClick={handleLogout}>Logout</button>
      {isAdmin ? <AdminPanel /> : <UserPanel />}
    </div>
  );
}

export default Dashboard;
