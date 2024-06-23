import EmptyPageContent from "../../components/Emptypage/index";
import people from "../../assets/People.webp";

const Vouchers = () => {
  const handleClick = () => {
    console.log("button clicked");
  };
  return (
    <>
      <EmptyPageContent
        image={people}
        title="No Vouchers created"
        description="Click the below button to get started"
        buttonText="Create New Voucher"
        clickHandler={handleClick}
      />
    </>
  );
};

export default Vouchers;
