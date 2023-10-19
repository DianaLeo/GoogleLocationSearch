import { FunctionComponent, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import './Layout.css'
//import { AiOutlineMenu } from "react-icons/ai";

const Layout: FunctionComponent = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      {/* <AiOutlineMenu className="navBtn" onClick={() => { setShow(s => !s) }} /> */}
      <nav className={`nav ${show ? "show" : ""}`}>
        <ul className="navUl" >
          <li>
            <Link className="link" to="/" onClick={() => { setShow(s => !s) }}>Home</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;