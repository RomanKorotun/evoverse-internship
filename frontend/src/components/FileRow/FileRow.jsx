// import "./FileRow.css";
// import FileActionButton from "../FileActionButton/FileActionButton";

// const FileRow = ({ file, onView, onDelete }) => {
//   return (
//     <tr className="files-tr">
//       <td className="files-td" title={file.name}>
//         {file.name}
//       </td>
//       <td className="files-td">{(file.sizeBytes / 1024).toFixed(2)} KB</td>
//       <td className="files-td">{new Date(file.createdAt).toLocaleString()}</td>
//       <td className="files-td files-actions">
//         <FileActionButton type="view" onClick={() => onView(file.name)}>
//           Переглянути
//         </FileActionButton>
//         <FileActionButton type="delete" onClick={() => onDelete(file.name)}>
//           Видалити
//         </FileActionButton>
//       </td>
//     </tr>
//   );
// };

// export default FileRow;

import "./FileRow.css";
import FileActionButton from "../FileActionButton/FileActionButton";

const getFileType = (filename) => {
  const ext = filename.split(".").pop().toLowerCase();
  const viewable = ["jpg", "jpeg", "png", "gif", "webp", "avif", "mp4", "pdf"];
  return viewable.includes(ext) ? "viewable" : "downloadOnly";
};

const FileRow = ({ file, onView, onDelete, onDownload }) => {
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
          <FileActionButton type="view" onClick={() => onView(file.name)}>
            Переглянути
          </FileActionButton>
        )}
        <FileActionButton type="download" onClick={() => onDownload(file.name)}>
          Скачати
        </FileActionButton>
        <FileActionButton type="delete" onClick={() => onDelete(file.name)}>
          Видалити
        </FileActionButton>
      </td>
    </tr>
  );
};

export default FileRow;
