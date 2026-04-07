import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import NavMenu from "./components/NavMenu/NavMenu";
import "./Layout.css";
import { filesStore } from "./store/fileStore";

const Layout = () => {
  const { fetchQuota } = filesStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await fetchQuota();
      setLoading(false);
    };
    init();
  }, []);

  if (loading) return null;

  return (
    <div className="layout">
      <NavMenu />
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
