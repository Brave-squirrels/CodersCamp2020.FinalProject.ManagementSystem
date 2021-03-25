import classes from "../sidebar.module.scss";

const PrimaryActiveItem = (props: any) => (
  <div className={classes.activePrimaryItem}>{props.teamName}</div>
);

export default PrimaryActiveItem;
