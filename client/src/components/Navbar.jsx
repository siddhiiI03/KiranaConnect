import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="logo">KiranaConnect</div>

      <div className="nav-links">
      <a href="#">Home</a>
<a href="#features">Features</a>
<a href="#about">About</a>
<a href="/kirana-login">Login</a>
      </div>
    </nav>
  );
}