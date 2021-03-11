import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../../assets/logo.svg";
import hamburger from "../../assets/hamburger.svg";

import NavigationItems from "../../components/UI/navigationItems/navigationItems";

import styles from "./header.module.scss";

import { openSideNav } from "../../reduxState/actions/sideNavAction";

const Header = (props: any) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <NavLink to="/" exact>
          <ul className={styles.logoList}>
            <li>
              <img src={logo} alt="Site logo" className={styles.logo} />
            </li>
            <li>
              <span className={styles.logoTitle}>Project Name</span>
            </li>
          </ul>
        </NavLink>
      </div>

      <img
        src={hamburger}
        className={styles.hamburger}
        onClick={props.onClickHamburger}
        alt="hamburger"
      />
      <div className={styles.navDisplay}>
        <NavigationItems flxDrc={true} />
      </div>
    </header>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClickHamburger: () => dispatch(openSideNav()),
  };
};

export default connect(null, mapDispatchToProps)(Header);
