import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";

import logo from "../../assets/logo.png";
import settings from "../../assets/settings.svg";
import hamburger from "../../assets/hamburger.svg";

import NavigationItem from "components/UI/navigationItem/navigationItem";

import styles from "./header.module.scss";

import { clickHamburger } from "reduxState/sideNavActionSlice";

const Header: FunctionComponent = () => {
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <ul className={styles.logoList}>
          <NavigationItem path="/">
            <img src={logo} alt="Site logo" className={styles.logo} />
            <span className={styles.logoTitle}>Management system</span>
          </NavigationItem>
        </ul>
      </div>

      <img
        src={hamburger}
        className={styles.hamburger}
        onClick={() => dispatch(clickHamburger())}
        alt="hamburger"
      />
      <div className={styles.navDisplay}>
        <ul className={styles.navList}>
          <NavigationItem path="/teams">Teams</NavigationItem>
          <NavigationItem path="/teaminvites">Team invites</NavigationItem>
          <NavigationItem path="/logout">Logout</NavigationItem>
          <NavigationItem path="/settings">
            <img
              src={settings}
              alt="User settings"
              className={styles.settingsImg}
            />
          </NavigationItem>
        </ul>
      </div>
    </header>
  );
};

export default Header;
