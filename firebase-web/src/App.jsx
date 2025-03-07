import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./component/PrivateRoute";
import Dashboard from "./component/Dashboard";
import SignUp from "./component/SignUp";
import Login from "./component/Login";

/*
SignUp :
  1 : email 
  2 : password

Login : 
  1 : email
  2 : password 

Dashboard : 
user : 
      login details : email // current user  setCurrentUser
      paasword
Logout

AuthContext : 
BrowerRouting
*/

function App() {
  // routing
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
