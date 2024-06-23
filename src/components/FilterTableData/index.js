import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./style.module.css";
import filterImage from "../../assets/filter.svg";

const Filter = ({ onSearchFilterChange, searchPlaceHolder }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [city, setCity] = useState("");

  const handleSearch = () => {
    onSearchFilterChange(city);
  };

  return (
    <div className={classes.filterTab}>
      <div
        className={classes.filterButton}
        onClick={() => setShowOptions(!showOptions)}
      >
        <img src={filterImage} alt="Filter" />
        Filter
      </div>

      {showOptions && (
        <div className={classes.searchByStatus}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={searchPlaceHolder}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
    </div>
  );
};

export default Filter;
