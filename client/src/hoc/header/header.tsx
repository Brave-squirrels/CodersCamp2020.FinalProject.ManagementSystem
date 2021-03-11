import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../../assets/logo.svg";
import settings from "../../assets/settings.svg";

import styles from "./header.module.scss";

import { openSideNav } from "../../redux/actions/sideNavAction";

const Header = (props: any) => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="Site logo" />
      <button className={styles.hamburger} onClick={props.onClickHamburger}>
        Hamburger
      </button>
      <div className={styles.navDisplay}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink to="/teams" activeClassName={styles.active} exact>
              Teams
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/teaminvites" activeClassName={styles.active} exact>
              Team invites
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/logout" activeClassName={styles.active} exact>
              Logout
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/settings" activeClassName={styles.active} exact>
              <img src={settings} alt="" />
            </NavLink>
          </li>
        </ul>
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
