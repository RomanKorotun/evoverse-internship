import { filesStore } from "../../store/fileStore";
import "./StorageStats.css";

const StorageStats = () => {
  const stats = filesStore((state) => state.stats);

  return (
    <section className="storage-stats">
      <h2 className="files-title">Статистика сховища</h2>
      {stats ? (
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Ліміт сховища:</span>
            <span className="stat-value">
              {(stats.quotaBytes / 1024 / 1024).toFixed(1)} MB
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Використано:</span>
            <span className="stat-value">
              {(stats.totalSizeBytes / 1024 / 1024).toFixed(2)} MB
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Кількість файлів:</span>
            <span className="stat-value">{stats.filesCount}</span>
          </div>
        </div>
      ) : (
        <p>Очікування даних...</p>
      )}
    </section>
  );
};

export default StorageStats;
