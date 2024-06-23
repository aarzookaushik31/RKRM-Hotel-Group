import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./style.module.css";
import edit from "../../assets/edit.svg";
import profile from "../../assets/profile.webp";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://52.66.101.51:3000/user/detail?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const result = await response.json();
        const data = result.data;
        console.log(data);
        setUser(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user details: {error.message}</p>;

  return (
    <div className={classes.userDetails}>
      <div className={classes.userImage}>
        <div>
          <img src={profile} alt="edit" />{" "}
        </div>
        <div>
          <h1>{user.name}</h1>
          <h2>Membership</h2>
        </div>
      </div>

      <div className={classes.fieldRow}>
        <div className={classes.detailItem}>
          <span>
            Email address <img src={edit} alt="edit" />
          </span>
          <div> {user.email}</div>
        </div>
        <div className={classes.detailItem}>
          <span>
            Mobile Number <img src={edit} alt="edit" />
          </span>
          <div>{user.mobileNumber}</div>
        </div>

        <div className={classes.detailItem}>
          <span>
            Date of Birth <img src={edit} alt="edit" />
          </span>
          <div>
            {" "}
            {new Date(user.dob).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {user.primaryAddress && (
          <div className={classes.detailItem}>
            <span>
              Address <img src={edit} alt="edit" />
            </span>
            <div>{user.primaryAddress}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
