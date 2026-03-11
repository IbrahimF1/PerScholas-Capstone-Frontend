import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProblemSelectionPage.css";

export default function ProblemSelectionPage() {
  const [problems, setProblems] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function getProblems() {
      try {
        let res = await axios.get("http://localhost:3000/problems");
        setProblems(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    getProblems();
  }, []);

  const difficultyLevels = ["Easy", "Medium", "Hard"];

  return (
    <div className="problem-selection">
      <h1>Problem Selection</h1>
      <div className="problem-sections-container">
        {difficultyLevels.map((level) => (
          <div key={level} className={`problem-section problem-section-${level.toLowerCase()}`}>
            <h2>{level}</h2>
            <div className="problem-buttons">
              {problems
                .filter((p) => p.difficulty === level)
                .map((p) => (
                  <button key={p._id} onClick={() => nav(`/coding/${p._id}`)}>
                    {p.title}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}