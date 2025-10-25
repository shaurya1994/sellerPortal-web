import { Link } from "react-router-dom";

import { layoutStyles } from "./Layout.styles";
import logo from "../../assets/logo.png";
import profile from "../../assets/admin_2.jpeg";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={layoutStyles.header}>
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
        {/* Left: Logo + Company */}
        <Link className="navbar-brand d-flex align-items-center text-white fw-semibold" to="/">

          <div style={layoutStyles.logoContainer}>
            <img src={logo} alt="Company Logo" style={layoutStyles.logo} />
          </div>

          {/* <img src={logo} alt="Logo" style={layoutStyles.logo} /> */}

          <span className="d-none d-sm-inline" style={layoutStyles.companyName}>
            Raw Alliance
          </span>
        </Link>

        {/* Right: Profile */}
        <div className="d-flex align-items-center">
          <img src={profile} alt="User" style={layoutStyles.profileImage} />
        </div>
      </div>
    </nav>
  );
};

export default Header;
