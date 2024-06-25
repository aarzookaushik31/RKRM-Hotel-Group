import React from "react";
import classes from "./style.module.css";
import columnSorting from "../../assets/column-sorting.svg";
import Pagination from "../Pagination/index";

const UserVoucherTable = ({
  userVoucherData,
  rowsPerPage,
  handleRowsPerPageChange,
  currentPage,
  handlePrevPage,
  handleNextPage,
  totalCount,
}) => {
  const totalPages = Math.ceil(totalCount / rowsPerPage);

  return (
    <div className={classes.tablearea}>
      <div className={classes.table}>
        <div className={classes.tableContainer}>
          {userVoucherData.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Voucher Code</th>
                  <th>Type</th>
                  <th>Voucher Id</th>
                  <th>
                    Status <img src={columnSorting} alt="" />
                  </th>
                  <th>Activity</th>
                </tr>
              </thead>
              <tbody>
                {userVoucherData.map((voucher, index) => (
                  <tr key={index}>
                    <td></td>
                    <td>{voucher.voucherCode}</td>
                    <td>{voucher.voucherType}</td>
                    <td>{voucher.voucherId}</td>
                    <td>
                      <span
                        className={
                          voucher.isActive
                            ? classes.activeDot
                            : classes.disabledDot
                        }
                      ></span>{" "}
                      {voucher.isActive ? "Active" : "Disabled"}
                    </td>
                    <td>
                      <div
                        className={`${classes[voucher.userVoucherStatus]} ${
                          classes.voucherStatus
                        }`}
                      >
                        {voucher.userVoucherStatus}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          filteredHotelsLength={userVoucherData.length}
          handleRowsPerPageChange={handleRowsPerPageChange}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          setPageUrl={() => {}}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default UserVoucherTable;
