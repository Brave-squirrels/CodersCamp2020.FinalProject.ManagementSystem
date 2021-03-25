import classes from "./secondaryItem.module.scss";

interface Props {
  id: string;
  name: string;
}

const SecondaryItem = (props: Props) => (
  <li key={props.id} className={classes.inActiveSecondaryItem}>
    {props.name}
  </li>
);

export default SecondaryItem;
