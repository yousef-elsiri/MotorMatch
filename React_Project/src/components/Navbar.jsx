import "../components/Navbar.css";
import { LuCar } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineLightMode } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const navLinks = [
  { name: "Browse", path: "/browse" },
  { name: "Sell", path: "/sell" },
  { name: "Dashboard", path: "/dashboard/porsche" },
  { name: "Messages", path: "/messages" },
  { name: "Admin", path: "/admin" },
];
function Navbar({ theme, setTheme }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className="navbar_container">
      <div className="navbar_container_Left_Side">
        <div className="logo">
          <h1 id="logo_text">
            <span id="logo_icon">
              <LuCar />
            </span>
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              MotorMatch
            </Link>
          </h1>
        </div>
        <div className="links">
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path}> {link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar_container_Right_Side">
        <div className="search">
          <div className="search_icon">
            <IoIosSearch />
          </div>
          <input
            className="search_input"
            type="text"
            placeholder="Search cars,brands,models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(`/browse?search=${search}`);
              }
            }}
          />
        </div>

        <button
          className="theme_toggle"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title="iam sorry is not working"
        >
          <MdOutlineLightMode />
        </button>
        <div className="sell_links">
          <Link
            to="/sell"
            style={{
              textDecoration: "none",
              backgroundColor: "#ff7b00",
              border: "none",
            }}
          >
            <span id="sell_icon">
              <CiCirclePlus />
            </span>
            sell a car
          </Link>
        </div>
        <div className="profile_links">
          <Link
            to={localStorage.getItem("token") ? "/user-profile" : "/profile"}
            style={{ textDecoration: "none" }}
          >
            {user ? (
              <div className="profile_avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <span id="profile_icon">
                <FiUser />
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
