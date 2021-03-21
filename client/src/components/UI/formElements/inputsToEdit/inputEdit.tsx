import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./inputEdit.module.scss";

const EditInput = (props: any) => {
  const [styles, setStyles] = useState<Array<string>>([]);

  const valid = useSelector(
    (state: any) => state.inputValidation[props.validator]
  );

  useEffect(() => {
    if (valid) {
      const styling = [classes.customField];
      setStyles([...styling]);
    } else {
      const styling = [classes.customField, classes.invalid];
      setStyles([...styling]);
    }
  }, [valid]);

  return (
    <label className={styles.join(" ")}>
      <input type="text" required onChange={props.valid} />
      <span className={classes.placeholder}>{props.value}</span>
    </label>
  );
};

export default EditInput;
