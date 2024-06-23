import React, { useState, useEffect } from "react";
import EmptyPageContent from "../../components/Emptypage/index";
import people from "../../assets/People.webp";
import Form from "../../components/Form/index";
import UserTable from "../../components/UserTable/index";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";

const Users = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [hotelId, setHotelId] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [membershipFilter, setMembershipFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [membershipOptions, setMembershipOptions] = useState([]);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  }, [searchParams]);

  useEffect(() => {
    const storedHotelId = localStorage.getItem("token");
    if (storedHotelId) {
      setHotelId(parseInt(storedHotelId, 10));
    }
  }, []);

  useEffect(() => {
    if (hotelId) {
      fetchUserData(membershipFilter, rowsPerPage, currentPage);
    }
    setInitialLoad(false);
  }, [membershipFilter, hotelId, rowsPerPage, currentPage]);

  useEffect(() => {
    console.log("userData :", userData);
  }, [userData]);

  const fetchUserData = async (
    membership = "",
    limit = rowsPerPage,
    page = 1
  ) => {
    try {
      let url = `http://52.66.101.51:3000/hotel/user?hotelId=${hotelId}&page=${page}&limit=${limit}`;
      if (membership) {
        url += `&membershipId=${membership}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const responseData = await response.json();
        const userDataArray = responseData.data.userList;
        setUserData(userDataArray);
      } else {
        console.error("Failed to fetch User data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching User data:", error);
    }
  };

  const handleMembershipFilterChange = (membership) => {
    setMembershipFilter(membership);
  };

  const fetchMembershipOptions = async () => {
    try {
      const url = `http://52.66.101.51:3000/membership/list?hotelId=${hotelId}`;
      const response = await fetch(url);
      if (response.ok) {
        const responseData = await response.json();
        const memberships = responseData.data.membershipList;
        const formattedMemberships = memberships.map((membership) => ({
          value: membership.membershipId,
          label: (
            <>
              <span>{membership.membershipName}</span>
              <span>₹{membership.membershipPrice}</span>
            </>
          ),
        }));
        setMembershipOptions(formattedMemberships);
      } else {
        console.error(
          "Failed to fetch membership options:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching membership options:", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    const newUserData = {
      hotelId: hotelId,
      name: formData.name,
      mobileNumber: formData.mobileNumber,
      dob: new Date(formData.dob).toISOString(),
      email: formData.email,
      membershipId: parseInt(formData.membership, 10),
    };

    try {
      const response = await fetch("http://52.66.101.51:3000/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      });

      if (response.ok) {
        fetchUserData(rowsPerPage, currentPage);
        setIsFormOpen(false);
      } else {
        console.error("Failed to save User:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving User:", error);
    }

    setIsFormOpen(false);
  };
  const handleClick = async () => {
    await fetchMembershipOptions();
    setIsFormOpen(true);
  };
  const handleUpdateUserData = () => {
    fetchUserData(membershipFilter, rowsPerPage, currentPage);
  };

  const setPageUrl = (page) => {
    setSearchParams({ page });
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
    setPageUrl(1);
  };

  const formConfig = {
    initialValues: {
      name: "",
      dob: "",
      email: "",
      mobileNumber: "",
      membership: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("User Name is required"),
      email: Yup.string().required("Email is required"),
      mobileNumber: Yup.string().required("Mobile Number is required"),
      dob: Yup.string().required("DOB is required"),
      membership: Yup.string().required("Membership is required"),
    }),
    fields: [
      { name: "name", label: "Enter Name", type: "text" },
      { name: "email", label: "Enter Email", type: "text" },
      { name: "dob", label: "Date of Birth", type: "date" },
      { name: "mobileNumber", label: "Enter Mobile Number", type: "number" },
      {
        name: "membership",
        label: "Select Membership",
        type: "radio",
        options: membershipOptions,
      },
    ],
    formTitle: "Create User",
  };

  return (
    <>
      {!isFormOpen && (
        <>
          {initialLoad || userData.length === 0 ? (
            <EmptyPageContent
              image={people}
              title="No users created"
              description="Click the below button to get started"
              buttonText="Create New User"
              clickHandler={handleClick}
            />
          ) : (
            <UserTable
              userData={userData}
              onAddUser={handleClick}
              onIdFilterChange={handleMembershipFilterChange}
              onUpdateUserData={handleUpdateUserData}
              noDataMessage="No Hotels Found"
              rowsPerPage={rowsPerPage}
              handleRowsPerPageChange={handleRowsPerPageChange}
              setPageUrl={setPageUrl}
              currentPage={currentPage}
            />
          )}
        </>
      )}

      {isFormOpen && (
        <Form
          isOpen={isFormOpen}
          onSubmit={handleFormSubmit}
          initialValues={formConfig.initialValues}
          validationSchema={formConfig.validationSchema}
          fields={formConfig.fields}
          formTitle={formConfig.formTitle}
        />
      )}
    </>
  );
};

export default Users;
