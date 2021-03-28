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
      <img
        src={hamburger}
        className={styles.hamburger}
        onClick={() => dispatch(clickHamburger())}
        alt="hamburger"
      />
      <ul className={styles.navList}>
        <NavigationItem path="/" clicked={() => dispatch(clickHamburger())}>
          <img src={logo} alt="Site logo" className={styles.logo} />
        </NavigationItem>
        <NavigationItem
          path="/teaminvites"
          clicked={() => dispatch(clickHamburger())}
        >
          Team invites
        </NavigationItem>
        <NavigationItem
          path="/logout"
          clicked={() => dispatch(clickHamburger())}
        >
          Logout
        </NavigationItem>
        <NavigationItem
          path="/settings"
          clicked={() => dispatch(clickHamburger())}
        >
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
