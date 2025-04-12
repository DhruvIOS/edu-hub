import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
       <Link to="/" > <span className="logo gradient-text">&lt;EDU-HUB&gt;</span> </Link>
      </div>
      <div className="navbar-right">
        <Link to="/about">About Us</Link>
        <span className="divider">|</span>
        <Link to="/help">Help</Link>
      </div>
    </nav>
  );
};

export default Navbar;
