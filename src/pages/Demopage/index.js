import { useNavigate } from "react-router-dom";
import EmptyPageContent from "../../components/Emptypage/index";
import emptyImage from "../../assets/Group.webp";
const DemoPage = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(-1);
  };
  return (
    <>
      <EmptyPageContent
        image={emptyImage}
        title="UNDER DEVELOPMENT"
        description="This page is underDevelopment"
        buttonText="Okay"
        clickHandler={clickHandler}
      />
    </>
  );
};

export default DemoPage;
