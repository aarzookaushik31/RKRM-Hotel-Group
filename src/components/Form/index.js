import React, { useState } from "react";
import classes from "./style.module.css";
const HotelForm = ({ isOpen, onSubmit }) => {
  const [formData, setFormData] = useState({
    hotelName: "",
    hotelId: "",
    phoneNumber: "",
    address: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      hotelName: "",
      hotelId: "",
      phoneNumber: "",
      address: "",
      password: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className={classes.formContainer}>
      <h1>Create Hotel</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Hotel Name
          <input
            type="text"
            name="hotelName"
            value={formData.hotelName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Hotel ID
          <input
            type="text"
            name="hotelId"
            value={formData.hotelId}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone Number
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create Hotel</button>
      </form>
    </div>
  );
};

export default HotelForm;
