import React, { useState, useEffect } from "react";
import EmptyPageContent from "../../components/Emptypage/index";
import emptyImage from "../../assets/Group.webp";
import Form from "../../components/Form/index";
import HotelTable from "../../components/HotelTable/index";
import * as Yup from "yup";
import { useSearchParams } from "react-router-dom";

const Hotel = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hotelData, setHotelData] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page, 10));
    }
  }, [searchParams]);

  useEffect(() => {
    const storedHotelId = localStorage.getItem("token");
    if (storedHotelId) {
      setHotelId(parseInt(storedHotelId));
    }
  }, []);

  useEffect(() => {
    if (hotelId) {
      fetchHotelData(cityFilter, rowsPerPage, currentPage);
    }
    setInitialLoad(false);
  }, [cityFilter, hotelId, rowsPerPage, currentPage]);

  useEffect(() => {
    console.log("HotelData :", hotelData);
  }, [hotelData]);

  const fetchHotelData = async (city = "", limit = rowsPerPage, page = 1) => {
    try {
      let url = `http://13.233.97.114:3000/hotel/location/list?hotelId=${hotelId}&limit=${limit}&page=${page}`;
      if (city) {
        url += `&hotelCity=${city}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const responseData = await response.json();
        const hotelDataArray = responseData.data;
        const hotels = hotelDataArray.hotelLocationList || [];
        setHotelData(hotels);
      } else {
        console.error("Failed to fetch hotel data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };

  const handleCityFilterChange = (city) => {
    setCityFilter(city);
  };

  const handleFormSubmit = async (formData) => {
    const newHotelData = {
      hotelId: hotelId,
      hotelLocationName: formData.hotelLocationName,
      hotelLocation: formData.address,
      hotelCity: formData.hotelCity,
    };

    try {
      const response = await fetch(
        "http://13.233.97.114:3000/hotel/add/location",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newHotelData),
        }
      );

      if (response.ok) {
        fetchHotelData(cityFilter, rowsPerPage, currentPage);
        setIsFormOpen(false);
      } else {
        console.error("Failed to save hotel:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving hotel:", error);
    }
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
    setPageUrl(1);
  };

  const handleClick = () => {
    setIsFormOpen(true);
  };

  const handleUpdateHotelData = () => {
    fetchHotelData(cityFilter, rowsPerPage, currentPage);
  };

  const setPageUrl = (page) => {
    setSearchParams({ page });
    setCurrentPage(page);
  };

  const formConfig = {
    initialValues: {
      hotelLocationName: "",
      hotelCity: "",
      address: "",
    },
    validationSchema: Yup.object().shape({
      hotelLocationName: Yup.string().required("Hotel Name is required"),
      hotelCity: Yup.string().required("Hotel city is required"),
      address: Yup.string().required("Address is required"),
    }),
    fields: [
      { name: "hotelLocationName", label: "Hotel Name", type: "text" },
      { name: "hotelCity", label: "Hotel City", type: "text" },
      { name: "address", label: "Address", type: "text" },
    ],
    formTitle: "Create Hotel",
  };

  return (
    <>
      {!isFormOpen && (
        <>
          {initialLoad || (cityFilter === "" && hotelData.length === 0) ? (
            <EmptyPageContent
              image={emptyImage}
              title="No Hotels created"
              description="Click the below button to get started"
              buttonText="Create New Hotel"
              clickHandler={handleClick}
            />
          ) : (
            <HotelTable
              hotelData={hotelData}
              onAddHotel={handleClick}
              onUpdateHotelData={handleUpdateHotelData}
              onCityFilterChange={handleCityFilterChange}
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

export default Hotel;
