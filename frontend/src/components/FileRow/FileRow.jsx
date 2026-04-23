// import "./FileRow.css";
// import ActionButton from "../ActionButton/ActionButton";
// import { filesStore } from "../../store/filesStore";
// import apiClient from "../../api/apiClient";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const getFileType = (filename) => {
//   if (!filename) return "downloadOnly";

//   const ext = filename.split(".").pop().toLowerCase();
//   const viewable = ["jpg", "jpeg", "png", "gif", "webp", "avif", "mp4", "pdf"];
//   return viewable.includes(ext) ? "viewable" : "downloadOnly";
// };

// const FileRow = ({ file }) => {
//   const { removeFile } = filesStore();

//   const handleDelete = async () => {
//     await removeFile(file.id);
//   };

//   const handleView = () => {
//     window.open(`${BACKEND_URL}/files/${file.id}/view`, "_blank");
//   };

//   const handleDownload = async () => {
//     try {
//       const res = await apiClient.get(`/files/${file.id}/download`, {
//         responseType: "blob",
//       });
//       const url = URL.createObjectURL(res.data);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = file.filename;
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.log("Download error:", error);
//     }
//   };

//   const type = getFileType(file.filename);

//   return (
//     <tr className="files-tr">
//       <td className="files-td" title={file.filename}>
//         {file.filename}
//       </td>

//       <td className="files-td">{(file.size / 1024).toFixed(2)} KB</td>

//       <td className="files-td">{new Date(file.createdAt).toLocaleString()}</td>

//       <td className="files-td files-actions">
//         {type === "viewable" && (
//           <ActionButton type="view" onClick={handleView}>
//             Переглянути
//           </ActionButton>
//         )}

//         <ActionButton type="download" onClick={handleDownload}>
//           Скачати
//         </ActionButton>

//         <ActionButton type="delete" onClick={handleDelete}>
//           Видалити
//         </ActionButton>
//       </td>
//     </tr>
//   );
// };

// export default FileRow;

import "./FileRow.css";
import ActionButton from "../ActionButton/ActionButton";
import { filesStore } from "../../store/filesStore";
import apiClient from "../../api/apiClient";

const BACKEND_URL = import.meta.env.VITE_API_URL;

// 🔥 універсальна перевірка MIME через розширення (але ширша логіка)
const getFileCategory = (filename = "") => {
  const ext = filename.split(".").pop()?.toLowerCase();

  if (!ext) return "downloadOnly";

  // 🌍 медіа які браузер реально вміє рендерити
  const image = ["jpg", "jpeg", "png", "gif", "webp", "avif", "svg"];
  const video = ["mp4", "webm", "mov", "m4v", "ogg"];
  const audio = ["mp3", "wav", "ogg", "aac", "m4a"];
  const pdf = ["pdf"];

  if (image.includes(ext)) return "image";
  if (video.includes(ext)) return "video";
  if (audio.includes(ext)) return "audio";
  if (pdf.includes(ext)) return "pdf";

  // ❗ все інше (docx, xlsx, zip, psd...) — тільки download
  return "downloadOnly";
};

const FileRow = ({ file }) => {
  const { removeFile } = filesStore();

  const handleDelete = async () => {
    await removeFile(file.id);
  };

  const handleView = () => {
    window.open(`${BACKEND_URL}/files/${file.id}/view`, "_blank");
  };

  const handleDownload = async () => {
    try {
      const res = await apiClient.get(`/files/${file.id}/download`, {
        responseType: "blob",
      });

      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");

      a.href = url;
      a.download = file.filename;
      a.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Download error:", error);
    }
  };

  const category = getFileCategory(file.filename);

  const canView =
    category === "image" ||
    category === "video" ||
    category === "audio" ||
    category === "pdf";

  return (
    <tr className="files-tr">
      <td className="files-td" title={file.filename}>
        {file.filename}
      </td>

      <td className="files-td">{(file.size / 1024).toFixed(2)} KB</td>

      <td className="files-td">{new Date(file.createdAt).toLocaleString()}</td>

      <td className="files-td files-actions">
        {canView && (
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
