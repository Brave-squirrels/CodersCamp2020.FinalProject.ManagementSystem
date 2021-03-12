import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import logo from "../../assets/logo.svg";
import settings from "../../assets/settings.svg";
import hamburger from "../../assets/hamburger.svg";

import NavigationItem from "components/UI/navigationItem/navigationItem";

import styles from "./header.module.scss";

import { openSideNav } from "../../reduxState/actions/sideNavAction";

import { AppDispatch } from "reduxState/actions/types";

type Props = {
  onClickHamburger: () => void;
};

const Header: FunctionComponent<Props> = (props) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <ul className={styles.logoList}>
          <NavigationItem path="/">
            <img src={logo} alt="Site logo" className={styles.logo} />
            <span className={styles.logoTitle}>Project Name</span>
          </NavigationItem>
        </ul>
      </div>

      <img
        src={hamburger}
        className={styles.hamburger}
        onClick={props.onClickHamburger}
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

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onClickHamburger: () => dispatch(openSideNav()),
  };
};

export default connect(null, mapDispatchToProps)(Header);
