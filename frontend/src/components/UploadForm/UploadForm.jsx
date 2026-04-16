import { useState } from "react";
import { filesStore } from "../../store/filesStore";

import "./UploadForm.css";

const UploadForm = () => {
  const [status, setStatus] = useState(null);
  const [statusType, setStatusType] = useState(null);

  const { handleFileUpload } = filesStore();

  const savedUser = JSON.parse(localStorage.getItem("authUser"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.fileInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await handleFileUpload(formData, {
        email: savedUser.email,
        password: savedUser.password,
      });

      setStatus("Файл завантажено ✅");
      setStatusType("success");

      e.target.reset();
    } catch (error) {
      console.log("error");
      const msg = error.response?.data?.message || "Помилка ❌";
      setStatus(msg);
      setStatusType("error");
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <input
        type="file"
        name="fileInput"
        className="upload-input"
        onClick={() => {
          setStatus(null);
          setStatusType(null);
        }}
      />

      <button type="submit" className="upload-button">
        Завантажити
      </button>

      {status && <p className={`status-message ${statusType}`}>{status}</p>}
    </form>
  );
};

export default UploadForm;
