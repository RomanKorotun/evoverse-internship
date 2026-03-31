import { useEffect, useState } from "react";
import axios from "axios";
import "./FilesPage.css";
import FilesList from "../../components/FilesList/FilesList";
import StorageStats from "../../components/StorageStats/StorageStats";
import { BACKEND_URL } from "../../config";

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchData = async () => {
    try {
      const filesRes = await axios.get(`${BACKEND_URL}/files`);
      setFiles(filesRes.data.files);

      const statsRes = await axios.get(`${BACKEND_URL}/files/stats`);
      setStats(statsRes.data);
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleView = (filename) => {
    window.open(`${BACKEND_URL}/files/${filename}`, "_blank");
  };

  const handleDownload = (filename) => {
    const link = document.createElement("a");
    link.href = `${BACKEND_URL}/files/download/${filename}`;
    link.download = filename;
    link.click();
  };

  const handleDelete = async (filename) => {
    try {
      await axios.delete(`${BACKEND_URL}/files/${filename}`);
      fetchData();
    } catch (error) {
      console.error("Помилка при видаленні:", error);
    }
  };

  return (
    <div className="files-page">
      <FilesList
        files={files}
        onView={handleView}
        onDownload={handleDownload}
        onDelete={handleDelete}
      />
      <StorageStats stats={stats} />
    </div>
  );
};

export default FilesPage;
