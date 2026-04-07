import { Link } from "react-router-dom";

import "./NavMenu.css";
import { filesStore } from "../../store/fileStore";

const NavMenu = () => {
  const quotaSet = filesStore((state) => state.quotaSet);

  return (
    <nav className="nav-menu">
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        {quotaSet && (
          <>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
            <li>
              <Link to="/files">Files</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavMenu;
