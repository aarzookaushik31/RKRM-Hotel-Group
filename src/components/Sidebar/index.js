import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./style.module.css";
import logo from "../../assets/logo.webp";
import vector from "../../assets/Vector.svg";
import dashboard from "../../assets/dashboard.svg";
import hotels from "../../assets/hotels.svg";
import logout from "../../assets/logout.svg";
import users from "../../assets/users.svg";
import settings from "../../assets/settings.svg";
import vouchers from "../../assets/voucher.svg";
import membership from "../../assets/award.svg";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <li className={classes.dashboardLink}>
              <img src={dashboard} alt="Dashboard" />{" "}
              <span className={classes.hideinopen}>Dashboard</span>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.activeLink : ""
                }
                to="/"
              >
                <img src={hotels} alt="Dashboard" />{" "}
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
                <img src={users} alt="users" />{" "}
                <span className={classes.hideinopen}>Users</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.activeLink : ""
                }
                to="/demo"
              >
                <img src={membership} alt="membership" />{" "}
                <span className={classes.hideinopen}>Membership</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.activeLink : ""
                }
                to="/demo"
              >
                <img src={vouchers} alt="vouchers" />{" "}
                <span className={classes.hideinopen}>Voucher</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? classes.activeLink : ""
                }
                to="/demo"
              >
                <img src={settings} alt="Dashboard" />{" "}
                <span className={classes.hideinopen}>Settings</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <NavLink to="/demo">
          <img src={logout} alt="logout" />{" "}
          <span className={classes.hideinopen}>Logout</span>
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;
