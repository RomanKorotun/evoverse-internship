import "./FileRow.css";
import FileActionButton from "../FileActionButton/FileActionButton";
import { filesStore } from "../../store/fileStore";
import { BACKEND_URL } from "../../config";

const getFileType = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  const viewable = ["jpg", "jpeg", "png", "gif", "webp", "avif", "mp4", "pdf"];
  return viewable.includes(ext) ? "viewable" : "downloadOnly";
};

const FileRow = ({ file }) => {
  const { removeFile } = filesStore();

  const handleDelete = async () => {
    await removeFile(file.name);
  };

  const handleView = () => {
    window.open(`${BACKEND_URL}/files/${file.name}`, "_blank");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `${BACKEND_URL}/files/download/${file.name}`;
    link.download = file.name;
    link.click();
  };

  const type = getFileType(file.name);

  return (
    <tr className="files-tr">
      <td className="files-td" title={file.name}>
        {file.name}
      </td>
      <td className="files-td">{(file.sizeBytes / 1024).toFixed(2)} KB</td>
      <td className="files-td">{new Date(file.createdAt).toLocaleString()}</td>
      <td className="files-td files-actions">
        {type === "viewable" && (
          <FileActionButton type="view" onClick={handleView}>
            Переглянути
          </FileActionButton>
        )}
        <FileActionButton type="download" onClick={handleDownload}>
          Скачати
        </FileActionButton>
        <FileActionButton type="delete" onClick={handleDelete}>
          Видалити
        </FileActionButton>
      </td>
    </tr>
  );
};

export default FileRow;
