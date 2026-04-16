import { Routes, Route } from "react-router-dom";

import Layout from "./Layout";
import SignupPage from "./pages/SignupPage/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import UserDetailsPage from "./pages/UserDetailsPage/UserDetailsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SignupPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="users/:id" element={<UserDetailsPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
