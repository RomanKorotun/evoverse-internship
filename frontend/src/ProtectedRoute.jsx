import { Navigate } from "react-router-dom";

import { filesStore } from "./store/fileStore";

const ProtectedRoute = ({ children }) => {
  const quotaSet = filesStore((state) => state.quotaSet);

  if (!quotaSet) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
