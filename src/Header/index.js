import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Header = () => {
  const history = useHistory();

  const logoutButton = () => {
    Cookies.remove("jwt_token");
    history.replace("/login");
  };

  return (
    <nav className="nav-element">
      <ul className="unorder-list">
        <Link to="/">
          <li className="list-item">Home</li>
        </Link>
        <Link to="/product">
          <li className="list-item">Product</li>
        </Link>
        <Link to="/job">
          <li className="list-item">Job</li>
        </Link>
        <Link to="/profile">
          <li className="list-item">Profile</li>
        </Link>
      </ul>
      <div>
        <button className="logout-button" type="button" onClick={logoutButton}>
          Logout
        </button>
      </div>
    </nav>
  );
};
export default Header;
