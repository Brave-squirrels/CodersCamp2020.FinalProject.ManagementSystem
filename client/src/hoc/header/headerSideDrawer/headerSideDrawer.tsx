import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";

import settings from "../../../assets/settings.svg";
import logo from "../../../assets/logo.png";
import hamburger from "../../../assets/hamburger.svg";

import NavigationItem from "components/UI/navigationItem/navigationItem";

import styles from "./headerSideDrawer.module.scss";

import allActions from "reduxState/indexActions";

import { AppDispatch, RootState } from "reduxState/actions/types";

const ResHeader: FunctionComponent = () => {
  const show = useSelector((state: RootState) => state.openSideNavReducer);

  const dispatch: AppDispatch = useDispatch();

  let attachedClasses = [styles.resNavCon, styles.closeResNav];

  if (show.open) {
    attachedClasses = [styles.resNavCon, styles.openResNav];
  }

  return (
    <div className={attachedClasses.join(" ")}>
      <img src={logo} alt="Site logo" className={styles.logo} />
      <img
        src={hamburger}
        className={styles.hamburger}
        onClick={() => dispatch(allActions.openSideNav())}
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

export default ResHeader;
