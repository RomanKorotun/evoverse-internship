import { useState } from "react";
import axios from "axios";
import "./UploadPage.css";
import { BACKEND_URL } from "../../config";

const UploadPage = () => {
  const [status, setStatus] = useState(null);
  const [statusType, setStatusType] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const file = form.fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`${BACKEND_URL}/files`, formData);
      setStatus("Файл успішно завантажено ✅");
      setStatusType("success");
      form.reset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Помилка при завантаженні ❌";
      setStatus(errorMessage);
      setStatusType("error");
    }
  };

  const handleFileChange = () => {
    setStatus(null);
    setStatusType(null);
  };

  return (
    <div className="upload-page">
      <form className="upload-form" onSubmit={handleSubmit}>
        <label htmlFor="fileInput" className="upload-label">
          Оберіть файл:
        </label>
        <input
          type="file"
          id="fileInput"
          name="fileInput"
          className="upload-input"
          onChange={handleFileChange}
        />
        <button type="submit" className="upload-button">
          Завантажити
        </button>
        {status && <p className={`status-message ${statusType}`}>{status}</p>}
      </form>
    </div>
  );
};

export default UploadPage;
