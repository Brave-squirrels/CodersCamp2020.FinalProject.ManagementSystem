import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./navigationItems.module.scss";

import settings from "../../../assets/settings.svg";

type navProps = { flxDrc: Boolean };

const navigationItems = (props: navProps) => {
  let flxClass;
  let settingClass;
  if (props.flxDrc) {
    flxClass = styles.navListRow;
    settingClass = styles.smallSettings;
  } else {
    flxClass = styles.navListColumn;
    settingClass = styles.bigSettings;
  }

  return (
    <ul className={flxClass}>
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
          <img src={settings} alt="" className={settingClass} />
        </NavLink>
      </li>
    </ul>
  );
};

export default navigationItems;
