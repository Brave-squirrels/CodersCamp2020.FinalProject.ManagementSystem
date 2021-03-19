import React from "react";
import { useHistory } from "react-router";
import Nav from "components/notification/notification";
import NavigationItem from "components/UI/navigationItem/navigationItem";
import checkMark from "assets/checkMark.svg";
import classes from "./confirmed.module.scss";
import logo from "../../assets/logo.png";

const Confirmed = () => {
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    history.push("/");
  };

  return (
    <div className={classes.confirmed}>
      <header className={classes.header}>
        <div className={classes.logoWrapper}>
          <ul className={classes.logoList}>
            <NavigationItem path="/">
              <img src={logo} alt="Site logo" className={classes.logo} />
              <span className={classes.logoTitle}>Management system</span>
            </NavigationItem>
          </ul>
        </div>
      </header>
      <form className={classes.confirmedForm} onSubmit={(e) => handleSubmit(e)}>
        <Nav
          title={"Email address confirmed"}
          subTitle={
            "Your account has been successfully created. Please use your email address to log in."
          }
          btnText={"Return to LOGIN"}
          img={checkMark}
        />
      </form>
    </div>
  );
};

export default Confirmed;
