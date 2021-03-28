import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

import styles from "./navigationItem.module.scss";

type Props = {
  path: string;
  children: any;
  activeClass?: string;
  clicked?: any;
};

const navigationItem: FunctionComponent<Props> = (props) => {
  return (
    <li className={styles.navItem}>
      <NavLink
        to={props.path}
        exact
        activeClassName={
          props.activeClass ? styles[props.activeClass] : styles.active
        }
        onClick={props.clicked}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
