import React from "react";
import Nav from "components/notification/notification";
import checkMark from "assets/checkMark.svg";

const Confirmed = () => {
  return (
    <div>
      <Nav
        title={"Email address confirmed"}
        subTitle={
          "Your account has been successfully created. Please use your email address to log in."
        }
        btnText={"Return to LOGIN"}
        img={"checkMark"}
      />
    </div>
  );
};

export default Confirmed;
