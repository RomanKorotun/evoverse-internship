import "./FilesList.css";
import FileRow from "../FileRow/FileRow";
import { filesStore } from "../../store/filesStore";

const columns = ["Ім’я файлу", "Розмір", "Дата створення", "Дії"];

const FilesList = () => {
  const files = filesStore((state) => state.files);

  return (
    <section className="files-list">
      <h2 className="files-title">Список файлів</h2>
      <table className="files-table">
        <thead className="files-thead">
          <tr className="files-tr">
            {columns.map((col) => (
              <th key={col} className="files-th">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="files-tbody">
          {Array.isArray(files) && files.length > 0 ? (
            files.map((file) => <FileRow key={file.id} file={file} />)
          ) : (
            <tr className="files-tr">
              <td className="files-td" colSpan="4">
                Файлів немає
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default FilesList;
