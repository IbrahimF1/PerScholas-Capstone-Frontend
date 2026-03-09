import { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function CodingPage() {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const nav = useNavigate();

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState("");

  // Load Problem
  useEffect(() => {
    async function fetchProblem() {
      try {
        const res = await axios.get(`http://localhost:3000/problems/${id}`);
        setProblem(res.data);
        setCode(res.data.starter_code);
        setTimeLeft(user.settings.time_limit * 60);
      } catch (err) {
        console.error("Failed to load problem", err);
      }
    }
    fetchProblem();
  }, [id, user.settings.time_limit]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  async function handleSubmit() {
    try {
      const res = await axios.post("http://localhost:3000/submissions", {
        user_id: user._id,
        problem_id: id,
        code: code,
        language: user.settings.default_language,
      });

      setStatus(res.data.submission.status);
      
      if (res.data.submission.status === "failed") {
        getFeedback(res.data.errorMessage);
      } else {
        setFeedback("🎉 Great job! Solution passed!");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getFeedback(errorMsg) {
    try {
      const res = await axios.post("http://localhost:3000/feedback", {
        code,
        problem_description: problem.description,
        error_message: errorMsg,
      });
      setFeedback(res.data.feedback);
    } catch (err) {
      setFeedback("Could not fetch AI feedback.");
    }
  }

  if (!problem) return <h1>Loading Problem...</h1>;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh", width: "90%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <h1>{problem.title} ({problem.difficulty})</h1>
        <h2>Timer: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</h2>
      </div>

      <div style={{ display: "flex", flex: 1, gap: "20px" }}>
        <div style={{ flex: 1, padding: "10px", border: "1px solid #444" }}>
          <p>{problem.description}</p>
        </div>
        
        <div style={{ flex: 2 }}>
          <Editor
            height="50vh"
            theme={user.settings.dark_mode ? "vs-dark" : "light"}
            language={user.settings.default_language}
            value={code}
            onChange={(val) => setCode(val)}
          />
          <button 
            onClick={handleSubmit} 
            disabled={timeLeft === 0}
            style={{ marginTop: "10px", padding: "10px 20px" }}
          >
            {timeLeft === 0 ? "Time Expired" : "Submit Solution"}
          </button>
        </div>
      </div>

      {feedback && (
        <div style={{ marginTop: "20px", padding: "15px", border: "2px solid #646cff" }}>
          <h3>AI Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}