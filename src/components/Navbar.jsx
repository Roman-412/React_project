import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <h2>ProExam</h2>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/exam">Exam</NavLink>
        <NavLink to="/result">Result</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>
    </nav>
  );
}