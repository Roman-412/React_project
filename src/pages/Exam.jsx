import React, { useState, useEffect } from "react";
import { questions } from "../data";
import { useNavigate } from "react-router-dom";

export default function Exam() {
  const [category, setCategory] = useState("");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setCurrent(0);
      setScore(0);
      setTimeLeft(60);
      setSelected(null);
    }
  }, [category]);

  useEffect(() => {
    if (!category || timeLeft === 0) {
      if (category && timeLeft === 0) finishExam();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, category]);

  const nextQuestion = () => {
    let newScore = score;
    if (selected === questions[category][current].a) {
      newScore = score + 1;
      setScore(newScore);
    }
    setSelected(null);

    if (current + 1 < questions[category].length) {
      setCurrent(current + 1);
    } else {
      finishExam(newScore);
    }
  };

  const finishExam = React.useCallback((finalScore) => {
    const s = finalScore !== undefined ? finalScore : score;
    localStorage.setItem("score", s);
    localStorage.setItem("total", questions[category]?.length || 0);
    navigate("/result");
  }, [category, score, navigate]);

  if (category && !questions[category]) {
    return (
      <div className="page">
        <h2>Invalid Category</h2>
        <button onClick={() => setCategory("")}>Back</button>
      </div>
    );
  }

  const categories = [
    { id: "html", name: "HTML", icon: "📄", desc: "Web Structure" },
    { id: "css", name: "CSS", icon: "🎨", desc: "Styling & Layout" },
    { id: "javascript", name: "JavaScript", icon: "⚡", desc: "Logic & Interactivity" },
    { id: "python", name: "Python", icon: "🐍", desc: "Data & Automation" },
    { id: "react", name: "React", icon: "⚛️", desc: "Modern Components" },
    { id: "sql", name: "SQL", icon: "🗄️", desc: "Database Queries" },
    { id: "gk", name: "GK", icon: "🌍", desc: "General Knowledge" },
    { id: "english", name: "English", icon: "🔤", desc: "Language Skills" },
    { id: "problem_solving", name: "Logic", icon: "🧩", desc: "Problem Solving" },
  ];

  return (
    <div className="page" style={{ maxWidth: !category ? "1200px" : "900px" }}>
      {!category ? (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Select a Category</h1>
          <p className="subtitle">Choose a subject to start your professional assessment.</p>
          <div className="category-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                onClick={() => setCategory(cat.id)}
              >
                <span className="category-icon">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
                <span className="category-desc">{cat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="exam-header">
            <h3 className="timer">Time Left: {timeLeft}s</h3>
            <button className="btn-small" onClick={() => setCategory("")}>Change Category</button>
          </div>
          <p className="subtitle">
            Question {current + 1} of {questions[category].length}
          </p>
          <h4>{questions[category][current].q}</h4>

          <div className="options">
            {questions[category][current].o.map((opt, i) => (
              <label key={i} className={`option-label ${selected === i ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="quiz-option"
                  value={i}
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                />
                {opt}
              </label>
            ))}
          </div>

          <button className="btn" disabled={selected === null} onClick={nextQuestion}>
            {current + 1 === questions[category].length ? "Finish Exam" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}