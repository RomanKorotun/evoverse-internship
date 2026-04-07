import "./HomePage.css";
import StorageQuotaForm from "../../components/StorageQuotaForm/StorageQuotaForm";
import { filesStore } from "../../store/fileStore";

const HomePage = () => {
  const quotaSet = filesStore((state) => state.quotaSet);

  return (
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">Evoverse Internship Homework-3</h1>
        <p className="home-description">
          Ласкаво просимо! Тут ви можете завантажувати, переглядати та видаляти
          файли (зображення, відео, документи, текстові файли).
        </p>
        {!quotaSet && (
          <div>
            <StorageQuotaForm setQuota={true}>Зберегти ліміт</StorageQuotaForm>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
