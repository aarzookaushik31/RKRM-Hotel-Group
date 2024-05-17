import React from "react";
import classes from "./style.module.css";

const EmptyPageContent = ({
  image,
  title,
  description,
  buttonText,
  clickHandler,
}) => {
  return (
    <div className={classes.EmptyPageContentContainer}>
      <img src={image} alt="Hotel" />
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={clickHandler}>{buttonText}</button>
    </div>
  );
};

export default EmptyPageContent;
