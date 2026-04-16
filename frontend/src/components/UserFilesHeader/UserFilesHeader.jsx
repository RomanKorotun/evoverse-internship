import "./UserFilesHeader.css";
import UserInfo from "../UserInfo/UserInfo";
import UploadForm from "../UploadForm/UploadForm";

const UserFilesHeader = () => {
  return (
    <section className="user-files-header">
      <div className="left">
        <UserInfo />
      </div>

      <div className="right">
        <h2 className="files-title">Завантажити файл</h2>
        <UploadForm />
      </div>
    </section>
  );
};

export default UserFilesHeader;
