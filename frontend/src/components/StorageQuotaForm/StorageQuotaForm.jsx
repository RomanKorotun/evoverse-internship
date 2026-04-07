import { useState } from "react";

import "./StorageQuotaForm.css";
import { convertMbToBytes } from "../../helpers/bytesConverter";
import { filesStore } from "../../store/fileStore";

const StorageQuotaForm = ({ setQuota, children }) => {
  const { createQuota, changeQuota } = filesStore();

  const [newQuota, setNewQuota] = useState("");
  const [error, setError] = useState("");

  const handleQuotaChange = async () => {
    const quotaInBytes = convertMbToBytes(newQuota);
    try {
      if (setQuota) {
        await createQuota(quotaInBytes);
      } else {
        await changeQuota(quotaInBytes);
      }
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
