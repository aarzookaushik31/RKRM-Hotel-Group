import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./style.module.css";
import edit from "../../assets/edit.svg";
import profile from "../../assets/profile.webp";
import UserVoucherTable from "../../components/UserVoucherTable/index";
import EditUserForm from "../../components/EditUserForm/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userVoucherData, setUserVoucherData] = useState([]);
  const [voucherLoading, setVoucherLoading] = useState(true);
  const [voucherError, setVoucherError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://43.204.15.248:3000/user/detail?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const result = await response.json();
        const data = result.data[0];
        setUser(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    const fetchUserVoucherData = async () => {
      setVoucherLoading(true);
      try {
        const response = await fetch(
          `http://43.204.15.248:3000/hotel/user/voucher/list?userId=${userId}&page=${currentPage}&limit=${rowsPerPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user voucher data");
        }
        const result = await response.json();
        setUserVoucherData(result.data.voucherDetails);
        setTotalCount(result.data.totalCount);
      } catch (error) {
        setVoucherError(error);
      } finally {
        setVoucherLoading(false);
      }
    };

    fetchUserVoucherData();
  }, [userId, currentPage, rowsPerPage]);

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalCount / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = async (values) => {
    try {
      const response = await fetch("http://43.204.15.248:3000/user/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.userId,
          isActive: user.isActive,
          ...values,
        }),
      });

      if (response.ok) {
        const updatedUser = { ...user, ...values };
        setUser(updatedUser);
        setIsEditing(false);
        toast.success("User details updated successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      } else {
        throw new Error("Failed to update user details");
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p>Error loading user details: {error.message}</p>;

  return (
    <div className={classes.userDetailsContainer}>
      {isEditing ? (
        <EditUserForm
          initialValues={{
            name: user.name,
            email: user.email,
            address: user.primaryAddress || "",
          }}
          onSubmit={handleEditSubmit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <div className={classes.userDetails}>
            <div className={classes.userImage}>
              <div>
                <img src={profile} alt="profile" />
              </div>
              <div>
                <h1>{user.name}</h1>
                <h2>{user.userMemberships.membershipName}</h2>
              </div>
            </div>

            <div className={classes.fieldRow}>
              <div className={classes.detailItem}>
                <span>
                  Email address{" "}
                  <img src={edit} alt="edit" onClick={handleEdit} />
                </span>
                <div>{user.email}</div>
              </div>

              {user.primaryAddress && (
                <div className={classes.detailItem}>
                  <span>
                    Address <img src={edit} alt="edit" onClick={handleEdit} />
                  </span>
                  <div>{user.primaryAddress}</div>
                </div>
              )}

              <div className={classes.detailItem}>
                <span>Mobile Number</span>
                <div>{user.mobileNumber}</div>
              </div>

              <div className={classes.detailItem}>
                <span>Date of Birth</span>
                <div>
                  {new Date(user.dob).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className={classes.userVoucherDetails}>
            <div className={classes.voucherDetailspadding}>
              <div>
                <h1>Membership & Vouchers</h1>
                <h2>Membership Id : {user.userMemberships.userMembershipId}</h2>
              </div>
              {voucherLoading ? (
                <p>Loading vouchers...</p>
              ) : voucherError ? (
                <p>Error loading vouchers: {voucherError.message}</p>
              ) : userVoucherData.length === 0 ? (
                <p>No vouchers found.</p>
              ) : (
                <UserVoucherTable
                  userVoucherData={userVoucherData}
                  rowsPerPage={rowsPerPage}
                  handleRowsPerPageChange={handleRowsPerPageChange}
                  currentPage={currentPage}
                  handlePrevPage={handlePrevPage}
                  handleNextPage={handleNextPage}
                  totalCount={totalCount}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetails;
