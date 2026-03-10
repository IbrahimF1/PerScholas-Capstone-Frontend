import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import "./SettingsPage.css";

export default function SettingsPage() {
  const { user, setUser } = useContext(AuthContext);
  const [settings, setSettings] = useState(user.settings);
  const [stats, setStats] = useState({ 
    attempted: user.problems_attempted, 
    solved: user.problems_solved 
  });

  // Fetch fresh user data on mount to ensure stats are accurate
  useEffect(() => {
    async function fetchFreshUser() {
      try {
        const res = await axios.get(`http://localhost:3000/user/profile/${user._id}`);
        setUser(res.data); // Update global context
        setStats({ attempted: res.data.problems_attempted, solved: res.data.problems_solved });
      } catch (err) {
        console.error("Failed to fetch fresh stats", err);
      }
    }
    fetchFreshUser();
  }, [user._id, setUser]);

  async function handleSave(e) {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/user/settings/${user._id}`, settings);
      setUser(res.data); // Update global context
      alert("Settings saved!");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      
      {/* User Stats Section */}
      <div className="stats-container">
        <h2>Your Statistics</h2>
        <p><strong>Problems Attempted:</strong> {stats.attempted}</p>
        <p><strong>Problems Solved:</strong> {stats.solved}</p>
      </div>

      <form className="settings-form" onSubmit={handleSave}>
        <h2>Preferences</h2>
        <label>Time Limit (minutes): </label>
        <input 
          type="number" 
          value={settings.time_limit} 
          onChange={(e) => setSettings({...settings, time_limit: e.target.value})}
        />
        <br /><br />
        
        <label>Default Language: </label>
        <select 
          value={settings.default_language} 
          onChange={(e) => setSettings({...settings, default_language: e.target.value})}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <br /><br />

        <label>Dark Mode: </label>
        <input 
          type="checkbox" 
          checked={settings.dark_mode}
          onChange={(e) => setSettings({...settings, dark_mode: e.target.checked})}
        />
        <br /><br />
        
        <button type="submit">Save Preferences</button>
      </form>
    </div>
  );
}