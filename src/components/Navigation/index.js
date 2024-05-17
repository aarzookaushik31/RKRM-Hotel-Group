import classes from "./style.module.css";
import search from "../../assets/search icon.svg";
import profileImage from "../../assets/user-profile.webp";
import notification from "../../assets/notification.svg";
import down from "../../assets/down-chevron.svg";

const Navigation = () => {
  return (
    <>
      <div className={classes.navigation}>
        <div className={classes.searcharea}>
          <img src={search} alt="Search" />
          <input type="text" placeholder="Search for voucher/Membership" />
        </div>

        <div className={classes.navigationLeft}>
          <img src={profileImage} alt="Profile" />
          <div className={classes.hotelDropdown}>
            <p>Administrator</p>
            <p>
              Club de Souza <img src={down} alt="down" />
            </p>
          </div>
          <div className={classes.notification}>
            <img src={notification} alt="notification" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
