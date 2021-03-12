import React, { FunctionComponent } from "react";
import { connect } from "react-redux";

import settings from "../../../assets/settings.svg";
import logo from "../../../assets/logo.svg";
import hamburger from "../../../assets/hamburger.svg";

import NavigationItem from "components/UI/navigationItem/navigationItem";

import styles from "./resHeader.module.scss";

import { openSideNav } from "reduxState/actions/sideNavAction";

import { AppDispatch, RootState } from "reduxState/actions/types";

type Props = {
  hamburgerChange: boolean;
  onClickHamburger: () => void;
};

const ResHeader: FunctionComponent<Props> = (props): any => {
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
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    hamburgerChange: state.openSideNavReducer.open,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onClickHamburger: () => dispatch(openSideNav()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResHeader);
