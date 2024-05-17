import EmptyPageContent from "../../components/Emptypage/index";
import people from "../../assets/People.webp";

const Users = () => {
  const handleClick = () => {
    console.log("button clicked");
  };
  return (
    <>
      <EmptyPageContent
        image={people}
        title="No users created"
        description="Click the below button to get started"
        buttonText="Create New User"
        clickHandler={handleClick}
      />
    </>
  );
};

export default Users;
