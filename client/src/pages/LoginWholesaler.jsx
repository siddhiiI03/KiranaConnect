import { useNavigate } from "react-router-dom";

export default function LoginWholesaler() {
  const navigate = useNavigate();

  return (
    <div className="login">
      <h2>Wholesaler Login</h2>

      <input placeholder="Email" />
      <input placeholder="Password" type="password" />

      <button className="btn" onClick={() => navigate("/wholesaler-dashboard")}>
        Login
      </button>
    </div>
  );
}