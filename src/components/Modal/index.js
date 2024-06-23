import classes from "./style.module.css";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return (
    <>
      <div onClick={props.onCloseHandler} className={classes.backDrop}></div>
      <div className={classes.modal}>
        <span onClick={props.onCloseHandler}> &#10006;</span>
        {props.children}
      </div>
    </>
  );
};

const ModalContainer = (props) => {
  return ReactDOM.createPortal(
    <Modal onCloseHandler={props.onCloseHandler}>{props.children}</Modal>,
    document.getElementById("modal-portal")
  );
};

export default ModalContainer;
