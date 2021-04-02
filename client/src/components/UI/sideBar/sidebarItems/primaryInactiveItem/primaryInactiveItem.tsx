import classes from "./primaryInactiveItem.module.scss";

interface Props {
  name: string;
  clickHandler: (e: any) => void;
  id: string;
}

const PrimaryInactiveItem = (props: Props) => (
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
