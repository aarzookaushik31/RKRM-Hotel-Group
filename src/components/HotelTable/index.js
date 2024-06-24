import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./style.module.css";
import threedots from "../../assets/threedots.svg";
import columnSorting from "../../assets/column-sorting.svg";
import idimg from "../../assets/idimg.svg";
import Pagination from "../Pagination/index";
import Filter from "../FilterTableData/index";

const HotelTable = ({
  hotelData,
  onAddHotel,
  onUpdateHotelData,
  onCityFilterChange,
  noDataMessage,
  handleRowsPerPageChange,
  setPageUrl,
}) => {
  const [popupIndex, setPopupIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageUrl(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setPageUrl(currentPage + 1);
  };

  const toggleStatus = async (index) => {
    const hotelToUpdate = hotelData[index];
    const updatedHotel = {
      hotelLocationId: hotelToUpdate.hotelLocationId,
      isActive: !hotelToUpdate.isActive,
      hotelCity: hotelToUpdate.hotelCity,
      hotelLocation: hotelToUpdate.hotelLocation,
      hotelLocationName: hotelToUpdate.hotelLocationName,
    };

    try {
      const response = await fetch(
        `http://13.233.97.114:3000/hotel/location/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedHotel),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update hotel status: ${response.statusText}`
        );
      }

      onUpdateHotelData();
    } catch (error) {
      console.error("Error updating hotel status:", error);
    }

    setPopupIndex(null);
  };

  const handlePopupClick = (index) => {
    setPopupIndex(popupIndex === index ? null : index);
  };

  return (
    <div className={classes.tablearea}>
      <div className={classes.tableTab}>
        <Filter
          onSearchFilterChange={onCityFilterChange}
          searchPlaceHolder="Enter City"
        />
        <button onClick={onAddHotel}>Create Hotel</button>
      </div>

      <div className={classes.table}>
        <div className={classes.tableContainer}>
          {hotelData.length === 0 && (
            <p className={classes.noHotelFound}>{noDataMessage}</p>
          )}

          {hotelData.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Hotel Name</th>
                  <th>Hotel City</th>
                  <th>
                    Hotel ID <img src={idimg} alt="" />
                  </th>
                  <th>
                    Creation Date <img src={columnSorting} alt="" />
                  </th>
                  <th>
                    Status <img src={columnSorting} alt="" />
                  </th>

                  <th className={classes.center}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hotelData.map((hotel, index) => (
                  <tr key={index}>
                    <td></td>
                    <td>{hotel.hotelLocationName}</td>
                    <td>{hotel.hotelCity}</td>
                    <td>{hotel.hotelLocationId}</td>
                    <td>
                      {new Date(hotel.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td>
                      <span
                        className={
                          hotel.isActive
                            ? classes.activeDot
                            : classes.disabledDot
                        }
                      ></span>{" "}
                      {hotel.isActive ? "Active" : "Disabled"}
                    </td>

                    <td className={classes.toggleButtonClick}>
                      <img
                        className={classes.pointer}
                        src={threedots}
                        alt="Actions"
                        onClick={() => handlePopupClick(index)}
                      />
                      {popupIndex === index && (
                        <div className={classes.popup}>
                          <button onClick={() => toggleStatus(index)}>
                            {hotel.isActive ? "Disable" : "Enable"}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {hotelData.length > 0 && (
          <Pagination
            currentPage={currentPage}
            filteredHotelsLength={hotelData.length}
            handleRowsPerPageChange={handleRowsPerPageChange}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            setPageUrl={setPageUrl}
          />
        )}
      </div>
    </div>
  );
};

export default HotelTable;
