import classes from "./style.module.css";
import { NavLink } from "react-router-dom";
const Error = () => {
  return (
    <>
      <div className={classes.ErrorContainer}>
        <h1>Ooops...</h1>
        <h2>404 PAGE NOT FOUND</h2>
        <p>An Error Occured</p>
        <NavLink className={classes.hideinopen} to="/">
          Visit Site
        </NavLink>
      </div>
    </>
  );
};

export default Error;
