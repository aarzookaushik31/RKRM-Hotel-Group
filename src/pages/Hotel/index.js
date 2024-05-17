import EmptyPageContent from "../../components/Emptypage/index";
import emptyImage from "../../assets/Group.webp";
import React, { useState } from "react";
import Form from "../../components/Form";
import classes from "./style.module.css";

const Hotel = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hotelData, setHotelData] = useState([]);

  const handleFormSubmit = (formData) => {
    setHotelData([...hotelData, formData]);
    setIsFormOpen(false);
  };

  const handleClick = () => {
    setIsFormOpen(true);
  };

  return (
    <>
      {!isFormOpen && hotelData.length === 0 && (
        <EmptyPageContent
          image={emptyImage}
          title="No Hotels created"
          description="Click the below button to get started"
          buttonText="Create New Hotel"
          clickHandler={handleClick}
        />
      )}
      <Form isOpen={isFormOpen} onSubmit={handleFormSubmit} />
      {hotelData.length > 0 && (
        <div>
          <div className={classes.tableTab}>
            <div className={classes.filterTab}>
              <div>Filter</div>
              <div>May 12, 2024 - June 23, 2024</div>
            </div>
            <button>Create Hotel</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Hotel Name</th>
                <th>Hotel ID</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {hotelData.map((hotel, index) => (
                <tr key={index}>
                  <td>{hotel.hotelName}</td>
                  <td>{hotel.hotelId}</td>
                  <td>{hotel.phoneNumber}</td>
                  <td>{hotel.address}</td>
                  <td>{hotel.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Hotel;
