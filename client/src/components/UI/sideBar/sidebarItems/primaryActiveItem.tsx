import classes from "../sidebar.module.scss";

const PrimaryActiveItem = (props: any) => (
  <div className={classes.activePrimaryItem}>{props.name}</div>
);

export default PrimaryActiveItem;
