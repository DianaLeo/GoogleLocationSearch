import { FunctionComponent, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";
import MenuIcon from "@mui/icons-material/Menu";

const Layout: FunctionComponent = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* <MenuIcon className="navBtn" onClick={() => { setShow(s => !s) }} /> */}
      <nav className={`nav ${show ? "show" : ""}`}>
        <ul className="navUl">
          <li>
            <Link
              className="link"
              to="/"
              onClick={() => {
                setShow((s) => !s);
              }}
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
