import { useEffect } from "react";

import "./UsersPage.css";
import UsersList from "../../components/UsersList/UsersList";
import { usersStore } from "../../store/usersStore";

const UsersPage = () => {
  const { fetchUsers } = usersStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="users-page">
      <UsersList />
    </div>
  );
};

export default UsersPage;
