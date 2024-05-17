import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation/index";
import Sidebar from "../../components/Sidebar/index";
import classes from "./style.module.css";

function RootLayout() {
  return (
    <>
      <div className={classes.container}>
        <Sidebar />
        <div className={classes.containerRight}>
          <div className={classes.contentNav}>
            <Navigation />
          </div>
          <div className={classes.contentArea}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default RootLayout;
