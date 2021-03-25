import classes from "../sidebar.module.scss";

const SecondaryItem = (props: any) => (
  <li key={props.id} className={classes.inActiveSecondaryItem}>
    {props.name}
  </li>
);

export default SecondaryItem;
