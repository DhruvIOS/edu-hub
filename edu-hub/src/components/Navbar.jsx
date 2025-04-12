import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="logo">&lt;EDU-HUB&gt;</span>
      </div>
      <div className="navbar-right">
        <Link to="/login">Login</Link>
        <span className="divider">|</span>
        <Link to="/signup">Sign-Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
