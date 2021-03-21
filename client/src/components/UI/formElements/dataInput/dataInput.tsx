import classes from "../inputsToEdit/inputEdit.module.scss";

const DataInput = () => {
  return (
    <label className={classes.customField}>
      <input type="date" id="date" name="Project Deadline" min="" />
      <span className={classes.placeholder}>Deadline</span>
    </label>
  );
};

export default DataInput;
