import { useState } from "react";

import "./StorageQuotaForm.css";
import { convertMbToBytes } from "../../helpers/bytesConverter";
import { filesStore } from "../../store/filesStore";
import { usersStore } from "../../store/usersStore";

const StorageQuotaForm = ({ children }) => {
  const { changeUserQuota } = usersStore();

  const [newQuota, setNewQuota] = useState("");
  const [error, setError] = useState("");

  const savedUser = JSON.parse(localStorage.getItem("authUser"));

  const { id, email, password } = savedUser;

  const handleQuotaChange = async () => {
    const quotaInBytes = convertMbToBytes(newQuota);
    try {
      await changeUserQuota(quotaInBytes, { email, password });
      setNewQuota("");
      setError("");
    } catch (err) {
      const serverMessage = err?.response?.data?.message;
      setError(serverMessage || "Сталася помилка при встановленні квоти");
      setNewQuota("");
    }
  };

  return (
    <div className="storage-quota-wrapper">
      {/* Форма */}
      <div className="storage-stats">
        <div className="quota-change">
          <div className="quota-input-wrapper">
            <input
              type="number"
              placeholder="Ліміт сховища"
              value={newQuota}
              min={1}
              step={1}
              onChange={(e) => {
                setNewQuota(e.target.value);
                setError("");
              }}
            />
            <span className="quota-unit">MB</span>
          </div>

          <button
            onClick={handleQuotaChange}
            disabled={!newQuota || Number(newQuota) <= 0}
          >
            {children}
          </button>
        </div>
      </div>

      {error && <div className="quota-error">{error}</div>}
    </div>
  );
};

export default StorageQuotaForm;
