import { useEffect } from "react";
import { filesStore } from "../../store/filesStore";
import "./StorageStats.css";

const StorageStats = () => {
  const stats = filesStore((state) => state.stats);

  if (!stats) {
    return (
      <section className="storage-stats">
        <h2 className="files-title">Статистика сховища</h2>
        <p>Завантаження...</p>
      </section>
    );
  }

  const quotaMB = (stats.quota ?? 0) / 1024 / 1024;
  const usedMB = (stats.usedBytes ?? 0) / 1024 / 1024;

  return (
    <section className="storage-stats">
      <h2 className="files-title">Статистика сховища</h2>

      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Ліміт сховища:</span>
          <span className="stat-value">{quotaMB.toFixed(1)} MB</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Використано:</span>
          <span className="stat-value">{usedMB.toFixed(2)} MB</span>
        </div>

        <div className="stat-item">
          <span className="stat-label">Кількість файлів:</span>
          <span className="stat-value">{stats.filesCount ?? 0}</span>
        </div>
      </div>
    </section>
  );
};

export default StorageStats;
