import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SignupForm.css";
import { convertMbToBytes } from "../../helpers/bytesConverter";
import AuthTabs from "../AuthTabs/AuthTabs";
import { authStore } from "../../store/authStore";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [quota, setQuota] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { registerUser } = authStore();

  const quotaInBytes = convertMbToBytes(quota);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, quota: quotaInBytes, password });
      navigate("/signin");
    } catch (err) {
      const message =
        err?.response?.data?.message || "Помилка при реєстрації ❌";
      setError(message);
    }
  };

  return (
    <div className="signup-form-wrapper">
      <form className="signup-form" onSubmit={handleSubmit}>
        <AuthTabs />
        <label className="signup-label">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Введіть email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
          className="signup-input"
          required
        />

        <label className="signup-label">Quota (MB)</label>
        <input
          type="number"
          name="quota"
          placeholder="Введіть квоту"
          value={quota}
          onChange={(e) => {
            setQuota(e.target.value);
            setError("");
          }}
          className="signup-input"
          min={1}
          required
        />

        <label className="signup-label">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Введіть пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="signup-input"
          required
        />

        <button type="submit" className="signup-button">
          Реєстрація
        </button>
        {error && <div className="signup-error">{error}</div>}
      </form>
    </div>
  );
};

export default SignupForm;
