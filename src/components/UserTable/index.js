import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./style.module.css";
import threedots from "../../assets/threedots.svg";
import columnSorting from "../../assets/column-sorting.svg";
import idimg from "../../assets/idimg.svg";
import Pagination from "../Pagination/index";
import Filter from "../FilterTableData/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTable = ({
  userData,
  onAddUser,
  rowsPerPage,
  noDataMessage,
  handleRowsPerPageChange,
  setPageUrl,
  onIdFilterChange,
  totalCount,
  handleDisableUser,
}) => {
  const [popupIndex, setPopupIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPageUrl(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPageUrl(currentPage + 1);
    }
  };

  const handlePopupClick = (index) => {
    setPopupIndex(popupIndex === index ? null : index);
  };

  return (
    <div className={classes.tablearea}>
      <div className={classes.tableTab}>
        <Filter
          onSearchFilterChange={onIdFilterChange}
          searchPlaceHolder="Enter Membership Id"
        />
        <button onClick={onAddUser}>Create User</button>
      </div>

      <div className={classes.table}>
        <div className={classes.tableContainer}>
          {userData.length === 0 && (
            <p className={classes.noHotelFound}>{noDataMessage}</p>
          )}

          <table>
            <thead>
              <tr>
                <th></th>
                <th>User Name</th>
                <th>
                  Membership <img src={idimg} alt="" />
                </th>
                <th>
                  Creation Date <img src={columnSorting} alt="" />
                </th>
                <th>
                  Status <img src={columnSorting} alt="" />
                </th>
                <th>Activity</th>
                <th className={classes.center}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => (
                <tr key={index}>
                  <td></td>
                  <td>{user.name}</td>
                  <td>{user.userMemberships.membershipName}</td>
                  <td>
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    <span
                      className={
                        user.isActive ? classes.activeDot : classes.disabledDot
                      }
                    ></span>
                    {user.isActive ? "Active" : "Disabled"}
                  </td>
                  <td>
                    <NavLink to={`/users/${user.userMemberships.userId}`}>
                      View Details
                    </NavLink>
                  </td>
                  <td className={classes.toggleButtonClick}>
                    <img
                      className={classes.pointer}
                      src={threedots}
                      alt=""
                      onClick={() => handlePopupClick(index)}
                    />
                    {popupIndex === index && (
                      <div
                        className={classes.popup}
                        onMouseLeave={() => setPopupIndex(null)}
                      >
                        <button
                          onClick={() =>
                            handleDisableUser(
                              user.userMemberships.userId,
                              user.isActive
                            )
                          }
                          className={
                            user.isActive
                              ? classes.disabledBtn
                              : classes.activeBtn
                          }
                        >
                          {user.isActive ? "Disable" : "Activate"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageChange={setPageUrl}
          rowsPerPage={rowsPerPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default UserTable;
