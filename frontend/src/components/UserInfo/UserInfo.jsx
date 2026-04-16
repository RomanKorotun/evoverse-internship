import { usersStore } from "../../store/usersStore";

const UserInfo = () => {
  const user = usersStore((state) => state.user);

  return (
    <div>
      <h2 className="files-title">Користувач</h2>

      <div className="user-card">
        <span className="user-value">{user?.email || "—"}</span>
      </div>
    </div>
  );
};

export default UserInfo;
