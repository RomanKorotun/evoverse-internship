import { useNavigate } from "react-router-dom";

import { authStore } from "../../store/authStore";
import "./UserInfo.css";

const UserInfo = () => {
  const user = authStore((state) => state.user);
  const { logoutUser } = authStore();

  const navigate = useNavigate();

  const handleSettings = () => {
    if (user?.role === "ADMIN") {
      navigate("/admin/settings");
    } else {
      navigate("/dashboard/settings");
    }
  };
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div>
      <h2 className="files-title"> {user?.role || "Користувач"}</h2>

      <div className="user-card">
        <span className="user-value">{user?.email || "—"}</span>

        <div className="user-actions">
          <button className="settings-btn" onClick={handleSettings}>
            Налаштування
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Вийти
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
