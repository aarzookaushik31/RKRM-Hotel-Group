import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./style.module.css";
import logo from "../../assets/logo.webp";
import vector from "../../assets/Vector.svg";
import dashboard from "../../assets/dashboard.svg";
import hotels from "../../assets/hotels.svg";
import logout from "../../assets/logout.svg";
import users from "../../assets/users.svg";
import vouchers from "../../assets/voucher.svg";
import membership from "../../assets/award.svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`${classes.sidebar} ${isOpen ? classes.open : ""}`}>
        <div>
          <div className={classes.logoContainer}>
            <img onClick={toggleSidebar} src={vector} alt="Menu" />
            <NavLink className={classes.hideinopen} to="/">
              <img src={logo} alt="Club De Souja" className={classes.logo} />
            </NavLink>
          </div>

          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.activeLink : ""
                }
                to="/demo"
              >
                <img src={dashboard} alt="Icon" />{" "}
                <span className={classes.hideinopen}>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.activeLink : ""
                }
                to="/"
              >
                <img src={hotels} alt="Icon" />{" "}
                <span className={classes.hideinopen}>Hotels</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.activeLink : ""
                }
                to="/users"
              >
                <img src={users} alt="icon" />{" "}
                <span className={classes.hideinopen}>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.activeLink : ""
                }
                to="/membership"
              >
                <img src={membership} alt="icon" />{" "}
                <span className={classes.hideinopen}>Membership</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.activeLink : ""
                }
                to="/vouchers"
              >
                <img src={vouchers} alt="icon" />{" "}
                <span className={classes.hideinopen}>Voucher</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <NavLink to="/login" onClick={handleLogout}>
          <img src={logout} alt="icon" />{" "}
          <span className={classes.hideinopen}>Logout</span>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
