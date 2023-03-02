//Modules
import { useState } from "react";
import { Link } from "react-router-dom";
// 
import { AiOutlinePlus } from "react-icons/ai";
//Pages
import FindPoll from "../Pages/FindPoll";
import Home from "../Pages/Home";
import CreatePoll from "../Pages/CreatePoll";


const NavBar = () => {
  //to change burger classes
  const [navButtonClass, setNavButtonClass] = useState("nav-button unclicked");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [navVisibility, setNavVisibility] = useState("nav-ul")
  const [navBarStyles, setNavBarStyles] = useState("nav-bar wrapper")
  //toggle burger menu change
  const updateMenu = () => {
    if (!isMenuClicked) {
      setNavButtonClass("clicked");
      setNavVisibility("nav-ul clicked")
      setNavBarStyles("nav-bar wrapper clicked")

    } else {
      setNavButtonClass("unclicked");
      setNavVisibility("nav-ul")
      setNavBarStyles("nav-bar wrapper")

    }
    setIsMenuClicked(!isMenuClicked);
  };



  return (
    <div className="nav-bkgd">
      <div className={navBarStyles}>
        <h1>
          <Link className="h1-link" to={`/`} element={<Home />}> Whatever Floats Your Vote </Link>
        </h1>
        <nav>
          <button className="nav-menu" onClick={updateMenu}>
            <AiOutlinePlus className={navButtonClass} />
          </button>
          <ul className={navVisibility} >
            <li>
              <Link className="menu-link" to={`/`} element={<Home />}>Home</Link>
            </li>
            <li>
              <Link className="menu-link" to={`/createpoll`} element={<CreatePoll />}> Create A Poll</Link>
            </li>
            <li>
              <Link className="menu-link" to={`/findpoll`} element={<FindPoll />}> Find A Poll</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div >
  );
};

export default NavBar;