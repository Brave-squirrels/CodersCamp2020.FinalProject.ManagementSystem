import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";

import settings from "../../../assets/settings.svg";
import logo from "../../../assets/logo.png";
import hamburger from "../../../assets/hamburger.svg";

import NavigationItem from "components/UI/navigationItem/navigationItem";

import styles from "./headerSideDrawer.module.scss";
import { clickHamburger } from "reduxState/sideNavActionSlice";

import { RootState } from "reduxState/store";

const ResHeader: FunctionComponent = () => {
  const show = useSelector((state: RootState) => state.sideNavAction);

  const dispatch = useDispatch();

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
        onClick={() => dispatch(clickHamburger())}
        alt="hamburger"
      />
      <ul className={styles.navList}>
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
