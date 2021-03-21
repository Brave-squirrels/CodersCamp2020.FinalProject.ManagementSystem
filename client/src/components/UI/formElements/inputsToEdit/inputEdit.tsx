import classes from "./inputEdit.module.scss";

const EditInput = (props: any) => {
  return (
    <label className={classes.customField}>
      <input type="text" required />
      <span className={classes.placeholder}>{props.value}</span>
    </label>
  );
};

export default EditInput;
