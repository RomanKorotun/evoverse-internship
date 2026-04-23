import { useNavigate } from "react-router-dom";

import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-buttons">
      <button className="auth-btn" onClick={() => navigate("/signup")}>
        Signup
      </button>

      <button className="auth-btn" onClick={() => navigate("/signin")}>
        Signin
      </button>
    </div>
  );
};

export default LandingPage;
