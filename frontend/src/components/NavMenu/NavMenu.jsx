import { Link } from "react-router-dom";

import "./NavMenu.css";

const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <ul className="nav-list">
        <li>
          <Link to="/">Signup</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
