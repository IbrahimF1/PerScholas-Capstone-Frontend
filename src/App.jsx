import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar.jsx";
import LoginPage from './pages/LoginPage.jsx';
import ProblemSelectionPage from "./pages/ProblemSelectionPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import CodingPage from './pages/CodingPage.jsx';
import './App.css'

/*
TODO:
 - Reduce break tag usage
 - Improve styling
 - 
*/

function App() {
  return (
    <>
      <NavBar />

      <div className="page-container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/problems" element={<ProblemSelectionPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/coding/:id" element={<CodingPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App
