import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page">
      <h1>Welcome to ProExam</h1>
      <p className="subtitle">Professional Online Assessment Platform built for excellence.</p>
      <Link to="/exam">
        <button>Start Practice</button>
      </Link>
    </div>
  );
}