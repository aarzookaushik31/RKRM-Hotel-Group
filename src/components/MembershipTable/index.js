import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./style.module.css";
import threedots from "../../assets/threedots.svg";
import columnSorting from "../../assets/column-sorting.svg";
import idimg from "../../assets/idimg.svg";

const MembershipTable = ({
  membershipData,
  onAddMembership,
  onStatusUpdate,
}) => {
  const [popupIndex, setPopupIndex] = useState(null);

  const toggleStatus = (membershipId, isActive) => {
    onStatusUpdate(membershipId, !isActive);
    setPopupIndex(null);
  };

  const handlePopupClick = (index) => {
    setPopupIndex(popupIndex === index ? null : index);
  };

  return (
    <div className={classes.tablearea}>
      <div className={classes.tableTab}>
        <div></div>
        <button onClick={onAddMembership}>Create Membership</button>
      </div>

      <div className={classes.table}>
        <div className={classes.tableContainer}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Membership</th>
                <th>
                  Price <img src={idimg} alt="ID Sorting" />
                </th>
                <th>
                  Creation Date{" "}
                  <img src={columnSorting} alt="Creation Date Sorting" />
                </th>
                <th>
                  Status <img src={columnSorting} alt="Status Sorting" />
                </th>
                <th>Activity</th>
                <th className={classes.center}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {membershipData.map((membership, index) => (
                <tr key={index}>
                  <td></td>
                  <td>{membership.membershipName}</td>
                  <td>₹{membership.membershipPrice}</td>
                  <td>
                    {new Date(membership.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td>
                    <span
                      className={
                        membership.isActive
                          ? classes.activeDot
                          : classes.disabledDot
                      }
                    ></span>{" "}
                    {membership.isActive ? "Active" : "Disabled"}
                  </td>
                  <td className={classes.pointer}>View Activity</td>
                  <td className={classes.toggleButtonClick}>
                    <img
                      className={classes.pointer}
                      src={threedots}
                      alt="Actions"
                      onClick={() => handlePopupClick(index)}
                    />
                    {popupIndex === index && (
                      <div className={classes.popup}>
                        <button
                          onClick={() =>
                            toggleStatus(
                              membership.membershipId,
                              membership.isActive
                            )
                          }
                        >
                          {membership.isActive ? "Disable" : "Enable"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MembershipTable;
