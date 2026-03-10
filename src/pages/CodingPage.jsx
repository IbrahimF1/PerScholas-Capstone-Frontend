import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function CodingPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [customTests, setCustomTests] = useState([]);
  const [newTest, setNewTest] = useState({ input: "", output: "" });
  const [feedback, setFeedback] = useState("");
  const [testResults, setTestResults] = useState([]); // Store execution outputs

  // Load Problem & Initialize Timer
  useEffect(() => {
    async function fetchProblem() {
      try {
        const res = await axios.get(`http://localhost:3000/problems/${id}`);
        setProblem(res.data);
        setCode(res.data.starter_code);
        // Initialize timer based on user settings
        setTimeLeft(user.settings.time_limit * 60);
      } catch (err) {
        console.error("Failed to load problem", err);
      }
    }
    fetchProblem();
  }, [id, user.settings.time_limit]);

  // Timer Countdown Logic
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
        code,
        language: user.settings.default_language,
        customTestCases: customTests,
      });

      setTestResults(res.data.results || []); // Save results to state

      if (res.data.submission.status === "failed") {
        setFeedback(`Failed ${res.data.submission.test_cases_passed}/${res.data.submission.test_cases_total} tests.`);
        getAIHint(res.data.errorMessage);
      } else {
        setFeedback("🎉 All tests passed!");
      }
    } catch (err) { console.error(err); }
  }

  async function getAIHint(errorMsg) {
    try {
      const res = await axios.post("http://localhost:3000/feedback", {
        code,
        problem_description: problem.description,
        error_message: errorMsg
      });
      setFeedback((prev) => prev + `\n\nAI Hint: ${res.data.feedback}`);
    } catch (err) {
      setFeedback((prev) => prev + "\n\nCould not fetch AI feedback.");
    }
  }

  if (!problem) return <h1>Loading...</h1>;

  return (
    <div style={{ width: "95%", margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{problem.title}</h1>
        <h2>Timer: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</h2>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Left: Description & Tests */}
        <div style={{ flex: 1 }}>
          <p>{problem.description}</p>
          <h3>Test Cases</h3>
            {[...problem.test_cases, ...customTests].map((t, i) => (
            <div key={i} style={{ padding: "5px", borderBottom: "1px solid #444", color: testResults[i] ? (testResults[i].passed ? "#0f0" : "#f00") : "white" }}>
              <strong>Input:</strong> {t.input}
              <br />
              <strong>Expected:</strong> {t.output}
              {testResults[i] && <div><strong>Output:</strong> {String(testResults[i].actual)}</div>}
            </div>
            ))}

          <h4>Add Custom Test Case</h4>
          <input placeholder="Input (e.g. 1, 2)" onChange={(e) => setNewTest({ ...newTest, input: e.target.value })} />
          <input placeholder="Output (e.g. 3)" onChange={(e) => setNewTest({ ...newTest, output: e.target.value })} />
          <button onClick={() => { setCustomTests([...customTests, newTest]); }}>Add</button>
        </div>

        {/* Right: Editor */}
        <div style={{ flex: 2 }}>
          <Editor
            height="400px"
            theme="vs-dark"
            value={code}
            onChange={setCode}
            options={{
              minimap: {
                enabled: false
              },
              // Optional: Hide scrollbars too
              scrollbar: {
                vertical: 'hidden',
                horizontal: 'hidden'
              }
            }} />
          <button onClick={handleSubmit} style={{ marginTop: "10px" }}>Run & Submit</button>
        </div>
      </div>
      <div>
      {feedback && <pre style={{ background: "#333", padding: "10px" }}>{feedback}</pre>}
      </div>
    </div>
  );
}