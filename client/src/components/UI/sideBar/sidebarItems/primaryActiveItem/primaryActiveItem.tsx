import classes from "./primaryActiveItem.module.scss";

interface Props {
  name: string;
}

const PrimaryActiveItem = (props: Props) => (
  <div className={classes.activePrimaryItem}>{props.name}</div>
);

export default PrimaryActiveItem;
