import "./FileRow.css";
import ActionButton from "../ActionButton/ActionButton";
import { filesStore } from "../../store/filesStore";
import { BACKEND_URL } from "../../config";
import apiClient from "../../api/apiClient";

const getFileType = (filename) => {
  if (!filename) return "downloadOnly";

  const ext = filename.split(".").pop().toLowerCase();
  const viewable = ["jpg", "jpeg", "png", "gif", "webp", "avif", "mp4", "pdf"];
  return viewable.includes(ext) ? "viewable" : "downloadOnly";
};

const FileRow = ({ file }) => {
  const { removeFile } = filesStore();

  const savedUser = JSON.parse(localStorage.getItem("authUser"));

  const handleDelete = async () => {
    await removeFile(file.id, {
      email: savedUser.email,
      password: savedUser.password,
    });
  };

  const handleView = () => {
    window.open(
      `${BACKEND_URL}/files/${file.id}/${savedUser.id}/view`,
      "_blank",
    );
  };

  const headers = {
    "x-email": savedUser.email,
    "x-password": savedUser.password,
  };

  const handleDownload = async () => {
    try {
      const { data } = await apiClient.get(`/files/${file.id}/download`, {
        headers,
        responseType: "blob",
      });
      const url = URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = file.filename;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Download error:", error);
    }
  };

  const type = getFileType(file.filename);

  return (
    <tr className="files-tr">
      <td className="files-td" title={file.filename}>
        {file.filename}
      </td>

      <td className="files-td">{(file.size / 1024).toFixed(2)} KB</td>

      <td className="files-td">{new Date(file.createdAt).toLocaleString()}</td>

      <td className="files-td files-actions">
        {type === "viewable" && (
          <ActionButton type="view" onClick={handleView}>
            Переглянути
          </ActionButton>
        )}

        <ActionButton type="download" onClick={handleDownload}>
          Скачати
        </ActionButton>

        <ActionButton type="delete" onClick={handleDelete}>
          Видалити
        </ActionButton>
      </td>
    </tr>
  );
};

export default FileRow;
