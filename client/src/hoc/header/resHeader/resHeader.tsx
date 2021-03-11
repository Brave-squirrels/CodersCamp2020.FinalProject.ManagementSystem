import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import logo from "../../../assets/logo.svg";
import settings from "../../../assets/settings.svg";

import styles from "./resHeader.module.scss";

import { openSideNav } from "../../../reduxState/actions/sideNavAction";

const ResHeader = (props: any): any => {
  let attachedClasses = [styles.resNavCon, styles.closeResNav];

  if (props.hamburgerChange) {
    attachedClasses = [styles.resNavCon, styles.openResNav];
  }

  return (
    <div className={attachedClasses.join(" ")}>
      <img src={logo} alt="Site logo" className={styles.logo} />
      <button className={styles.hamburger} onClick={props.onClickHamburger}>
        Hamburger
      </button>
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
  );
};

const mapStateToProps = (state: any) => {
  return {
    hamburgerChange: state.openSideNavReducer.open,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onClickHamburger: () => dispatch(openSideNav()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResHeader);
