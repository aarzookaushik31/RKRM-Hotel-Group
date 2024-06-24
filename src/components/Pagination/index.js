import React from "react";
import classes from "./style.module.css";
import down from "../../assets/down-chevron.svg";

const Pagination = ({
  currentPage,
  handlePrevPage,
  handleNextPage,
  handleRowsPerPageChange,
  totalPages,
}) => {
  return (
    <div className={classes.paginationContainer}>
      <div className={classes.paginationContainerLeft}>
        <div className={classes.rowperpagecontainer}>
          <label htmlFor="rowsPerPage" className={classes.rowsPerPageLabel}>
            Rows per page
          </label>
          <select
            id="rowsPerPage"
            className={classes.rowsPerPage}
            defaultValue={10}
            onChange={(event) => {
              handleRowsPerPageChange(event);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>
      <div className={classes.paginationContainerRight}>
        <div
          className={`${classes.prevButton} ${
            currentPage === 1 ? classes.disabled : classes.pointer
          }`}
          onClick={() => {
            handlePrevPage();
          }}
        >
          <img src={down} alt="Prev" /> Prev
        </div>
        <div className={classes.pageNumber}>{currentPage}</div>
        <div
          className={`${classes.nextButton} ${
            currentPage === totalPages ? classes.disabled : classes.pointer
          }`}
          onClick={() => {
            handleNextPage();
          }}
        >
          Next <img src={down} alt="Next" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
