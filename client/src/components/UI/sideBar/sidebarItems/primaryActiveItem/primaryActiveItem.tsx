import classes from "./primaryActiveItem.module.scss";

const PrimaryActiveItem = (props: any) => (
  <div className={classes.activePrimaryItem}>{props.name}</div>
);

export default PrimaryActiveItem;
