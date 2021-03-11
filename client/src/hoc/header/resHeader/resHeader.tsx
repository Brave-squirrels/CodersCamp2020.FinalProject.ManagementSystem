import React from "react";
import { connect } from "react-redux";

import logo from "../../../assets/logo.svg";
import hamburger from "../../../assets/hamburger.svg";

import styles from "./resHeader.module.scss";

import NavigationItems from "../../../components/UI/navigationItems/navigationItems";

import { openSideNav } from "reduxState/actions/sideNavAction";

const ResHeader = (props: any): any => {
  let attachedClasses = [styles.resNavCon, styles.closeResNav];

  if (props.hamburgerChange) {
    attachedClasses = [styles.resNavCon, styles.openResNav];
  }

  return (
    <div className={attachedClasses.join(" ")}>
      <img src={logo} alt="Site logo" className={styles.logo} />
      <img
        src={hamburger}
        className={styles.hamburger}
        onClick={props.onClickHamburger}
        alt="hamburger"
      />
      <NavigationItems flxDrc={false} />
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
