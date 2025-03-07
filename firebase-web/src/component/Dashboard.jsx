import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("Failed to logout");
    }
  }

  return (
    <div>
      <h1>My Website</h1>

      <LogOut size={32} />
      <button onClick={handleLogout}>Logout</button>

      <User size={48} />
      <div>
        <p>{currentUser?.email}</p>
      </div>
    </div>
  );
}

export default Dashboard;
