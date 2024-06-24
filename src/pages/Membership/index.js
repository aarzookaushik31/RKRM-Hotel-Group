import React, { useState, useEffect } from "react";
import EmptyPageContent from "../../components/Emptypage/index";
import people from "../../assets/People.webp";
import Form from "../../components/MembershipForm/index";
import ModalContainer from "../../components/Modal/index";
import MembershipTable from "../../components/MembershipTable/index";

const Users = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [membershipData, setMembershipData] = useState([]);
  const [hotelId, setHotelId] = useState(null);

  useEffect(() => {
    const storedHotelId = localStorage.getItem("token");
    if (storedHotelId) {
      setHotelId(parseInt(storedHotelId, 10));
    }
  }, []);

  const fetchMembershipData = async () => {
    if (!hotelId) return;

    try {
      const response = await fetch(
        `http://13.233.97.114:3000/membership/list?hotelId=${hotelId}`
      );
      if (response.ok) {
        const responseData = await response.json();
        setMembershipData(responseData.data.membershipList);
        console.log(responseData.data.membershipList);
      } else {
        console.error("Failed to fetch membership data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching membership data:", error);
    }
  };

  useEffect(() => {
    fetchMembershipData();
  }, [hotelId]);

  const handleFormSubmit = async (formData) => {
    const newMembershipData = {
      hotelId: hotelId,
      membershipName: formData.membershipName,
      membershipPrice: formData.membershipPrice,
      membershipBenefits: formData.membershipBenefits,
    };

    try {
      const response = await fetch(
        "http://13.233.97.114:3000/membership/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMembershipData),
        }
      );

      if (response.ok) {
        fetchMembershipData();
      } else {
        console.error("Failed to save membership:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving membership:", error);
    }

    setIsFormOpen(false);
  };

  const handleClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseModal = () => {
    setIsFormOpen(false);
  };

  const handleStatusUpdate = async (membershipId, isActive) => {
    try {
      const response = await fetch(
        "http://13.233.97.114:3000/membership/edit",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ membershipId, isActive }),
        }
      );

      if (response.ok) {
        fetchMembershipData();
      } else {
        console.error(
          "Failed to update membership status:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating membership status:", error);
    }
  };

  if (!isFormOpen) {
    if (!membershipData?.length) {
      return (
        <>
          <EmptyPageContent
            image={people}
            title="No Membership created"
            description="Click the below button to get started"
            buttonText="Create New Membership"
            clickHandler={handleClick}
          />
        </>
      );
    }
    return (
      <>
        <MembershipTable
          membershipData={membershipData}
          onAddMembership={handleClick}
          onUpdateMembershipData={setMembershipData}
          onStatusUpdate={handleStatusUpdate}
        />
      </>
    );
  }

  return (
    <ModalContainer onCloseHandler={handleCloseModal}>
      <Form isOpen={isFormOpen} onSubmit={handleFormSubmit} />
    </ModalContainer>
  );
};

export default Users;
