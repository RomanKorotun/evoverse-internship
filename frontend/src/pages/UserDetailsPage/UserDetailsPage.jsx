import { useEffect } from "react";
import { useParams } from "react-router-dom";

import "./UserDetailsPage.css";
import FilesList from "../../components/FilesList/FilesList";
import StorageStats from "../../components/StorageStats/StorageStats";
import StorageQuotaForm from "../../components/StorageQuotaForm/StorageQuotaForm";
import { filesStore } from "../../store/filesStore";
import { usersStore } from "../../store/usersStore";
import UserFilesHeader from "../../components/UserFilesHeader/UserFilesHeader";

const FilesPage = () => {
  const { fetchStats, fetchFiles } = filesStore();
  const { fetchUser } = usersStore();

  const { id } = useParams();

  const savedUser = JSON.parse(localStorage.getItem("authUser"));

  useEffect(() => {
    const loadData = async () => {
      if (id && savedUser) {
        try {
          await fetchUser({
            email: savedUser.email,
            password: savedUser.password,
          });

          await fetchFiles({
            email: savedUser.email,
            password: savedUser.password,
          });

          await fetchStats({
            email: savedUser.email,
            password: savedUser.password,
          });
        } catch (err) {
          console.error("Помилка при завантаженні даних:", err);
        }
      }
    };

    loadData();
  }, [id]);

  return (
    <div className="files-page">
      <UserFilesHeader />
      <FilesList />
      <StorageStats />
      <div className="storage-quota-wrapper">
        <StorageQuotaForm>Змінити ліміт</StorageQuotaForm>
      </div>
    </div>
  );
};

export default FilesPage;
