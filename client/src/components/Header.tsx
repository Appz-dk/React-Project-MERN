import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav className="header" style={{ color: "white" }}>
      <ul>
        <Link to={"/"}>Home</Link>
      </ul>
    </nav>
  );
};

export default Header;
