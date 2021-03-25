import classes from "../sidebar.module.scss";

const PrimaryInactiveItem = (props: any) => (
  <li
    key={props.id}
    id={props.id}
    className={classes.inactivePrimaryItem}
    onClick={props.clickHandler}
  >
    {props.name}
  </li>
);

export default PrimaryInactiveItem;
