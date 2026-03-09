import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";

export default function SettingsPage() {
  const { user, setUser } = useContext(AuthContext);
  const [settings, setSettings] = useState(user.settings);

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
    <div style={{ marginTop: "50px" }}>
      <h1>Settings</h1>
      <form onSubmit={handleSave}>
        <label>Time Limit (minutes): </label>
        <input
          type="number"
          value={settings.time_limit}
          onChange={(e) => setSettings({ ...settings, time_limit: e.target.value })}
        />
        <br /><br />

        <label>Default Language: </label>
        <select
          value={settings.default_language}
          onChange={(e) => setSettings({ ...settings, default_language: e.target.value })}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <br /><br />

        <label>Dark Mode: </label>
        <input
          type="checkbox"
          checked={settings.dark_mode}
          onChange={(e) => setSettings({ ...settings, dark_mode: e.target.checked })}
        />
        <br /><br />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}