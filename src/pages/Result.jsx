import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const scoreRaw = localStorage.getItem("score");
  const totalRaw = localStorage.getItem("total");

  const score = parseInt(scoreRaw) || 0;
  const total = parseInt(totalRaw) || 0;
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  let message = "Keep Learning!";
  if (percent >= 80) message = "Excellent!";
  else if (percent >= 50) message = "Good Job!";

  if (total === 0 && !scoreRaw) {
    return (
      <div className="page">
        <h2>No Result Found</h2>
        <p className="subtitle">Please complete an exam first to see your results.</p>
        <button onClick={() => navigate("/exam")}>Go to Exam</button>
      </div>
    );
  }

  return (
    <div className="page">
      <h2>Exam Result</h2>
      <div className="card">
        <div className="score-circle">
          <span className="score-value">{percent}%</span>
          <span className="score-total">{score} / {total}</span>
        </div>
        <h3 style={{ color: "var(--primary)", marginTop: "1rem" }}>{message}</h3>
        <p className="subtitle" style={{ marginTop: "1.5rem" }}>
          Great effort! Keep practicing to improve your technical skills.
        </p>
        <button onClick={() => navigate("/exam")}>Retake Exam</button>
      </div>
    </div>
  );
}