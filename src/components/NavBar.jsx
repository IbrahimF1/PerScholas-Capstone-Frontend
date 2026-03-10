import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import "./NavBar.css";

export default function NavBar() {
  const { user, token, setToken, setUser } = useContext(AuthContext);
  const nav = useNavigate();

  async function handleLogout() {
    try {
      await axios.post("http://localhost:3000/auth/logout", { token });
      setToken(null);
      setUser(null);
      nav("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <nav className="navbar">
      <h2>Project Assist</h2>
      <div className="navbar-buttons">
        <NavLink to="/problems"><button className="navbar-button">Problems</button></NavLink>
        {user ? (
          <>
            <NavLink to="/settings"><button className="navbar-button">Settings</button></NavLink>
            <button onClick={handleLogout}>Logout ({user.username})</button>
          </>
        ) : (
          <NavLink to="/"><button>Login</button></NavLink>
        )}
      </div>
    </nav>
  );
}