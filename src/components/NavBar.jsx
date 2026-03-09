import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

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
    <nav>
      <h2>AlgoPrep</h2>
      <div>
        <NavLink to="/problems"><button style={{ marginRight: '10px' }}>Problems</button></NavLink>
        {user ? (
          <>
            <NavLink to="/settings"><button style={{ marginRight: '10px' }}>Settings</button></NavLink>
            <button onClick={handleLogout}>Logout ({user.username})</button>
          </>
        ) : (
          <NavLink to="/"><button>Login</button></NavLink>
        )}
      </div>
    </nav>
  );
}