import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div style={{ textAlign: "center" }}>
      <h1>Problem Selection</h1>
      {difficultyLevels.map((level) => (
        <section key={level}>
          <h2>{level}</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            {problems
              .filter((p) => p.difficulty === level)
              .map((p) => (
                <button key={p._id} onClick={() => nav(`/coding/${p._id}`)}>
                  {p.title}
                </button>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}