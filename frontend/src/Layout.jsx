import NavMenu from "./components/NavMenu/NavMenu";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
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
