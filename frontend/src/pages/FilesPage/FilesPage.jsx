import { useEffect } from "react";

import "./FilesPage.css";
import FilesList from "../../components/FilesList/FilesList";
import StorageStats from "../../components/StorageStats/StorageStats";
import StorageQuotaForm from "../../components/StorageQuotaForm/StorageQuotaForm";
import { filesStore } from "../../store/fileStore";

const FilesPage = () => {
  const { fetchStats, fetchFiles } = filesStore();

  useEffect(() => {
    fetchStats();
    fetchFiles();
  }, []);

  return (
    <div className="files-page">
      <FilesList />
      <StorageStats />
      <div className="storage-quota-wrapper">
        <StorageQuotaForm>Змінити ліміт</StorageQuotaForm>
      </div>
    </div>
  );
};

export default FilesPage;
