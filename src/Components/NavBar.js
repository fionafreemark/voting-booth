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
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [navButtonClass, setNavButtonClass] = useState("nav-button unclicked");
  const [navVisibility, setNavVisibility] = useState("nav-ul unclicked")
  const [navBarStyles, setNavBarStyles] = useState("nav-bar wrapper")

  //Mobile Menu Toggle Open/Close
  const updateMenu = () => {
    if (!isMenuClicked) {
      setNavButtonClass("nav-button clicked");
      setNavVisibility("nav-ul clicked")
      setNavBarStyles("nav-bar wrapper clicked")
    } else {
      setNavButtonClass("nav-button unclicked");
      setNavVisibility("nav-ul unclicked")
      setNavBarStyles("nav-bar wrapper unclicked")
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const closeMenu = () => {
    setNavButtonClass("nav-button unclicked");
    setNavVisibility("nav-ul unclicked");
    setIsMenuClicked(false);
  };

  return (
    <div className="nav-bkgd">
      <div className={navBarStyles}>
        <h1>
          <Link className="h1-link" to={`/`} element={<Home />}> Whatever Floats Your Vote</Link>
        </h1>
        <nav className="desktop-nav">
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
        <nav className="mobile-nav">
          <button className="nav-menu" onClick={updateMenu}>
            <AiOutlinePlus className={navButtonClass} />
          </button>
          <ul className={navVisibility} >
            <li>
              <Link className="menu-link" to={`/`} element={<Home />} onClick={closeMenu}>Home</Link>
            </li>
            <li>
              <Link className="menu-link" to={`/createpoll`} element={<CreatePoll />} onClick={closeMenu}> Create A Poll</Link>
            </li>
            <li>
              <Link className="menu-link" to={`/findpoll`} element={<FindPoll />} onClick={closeMenu}> Find A Poll</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div >
  );
};

export default NavBar;