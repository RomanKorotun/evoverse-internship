import { useEffect } from "react";

import FilesList from "../../components/FilesList/FilesList";
import StorageStats from "../../components/StorageStats/StorageStats";
import UserFilesHeader from "../../components/UserFilesHeader/UserFilesHeader";
import { filesStore } from "../../store/filesStore";
import "./DashboardPage.css";

const DashboardPage = () => {
  const { fetchStats, fetchFiles } = filesStore();

  useEffect(() => {
    fetchFiles();
    fetchStats();
  }, []);

  return (
    <div className="files-page">
      <UserFilesHeader />
      <FilesList />
      <StorageStats />
    </div>
  );
};

export default DashboardPage;
