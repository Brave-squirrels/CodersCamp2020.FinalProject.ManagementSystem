import { useEffect } from "react";
import Button from "../button/button";

import classes from "./form.module.scss";

import EditInput from "../inputsToEdit/inputEdit";
import DataInput from "../dataInput/dataInput";
import { useDispatch } from "react-redux";
import {
  teamDescriptionFalse,
  teamDescriptionTrue,
  teamNameFalse,
  teamNameTrue,
} from "reduxState/teamInfoSlice";

// interface Props {
//   value: string;
//   submitted: (e: any) => void;
// }

const Form = (props: any) => {
  useEffect(() => {
    if (props.value === "Project") {
      const currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      let day = String(currentDate.getDate());
      let month = String(currentDate.getMonth() + 1);
      if (month.length < 2) {
        month = `0${month}`;
      }
      if (day.length < 2) {
        day = `0${day}`;
      }
      const year = currentDate.getFullYear();
      const d = `${year}-${month}-${day}`;
      const inputDate = document.getElementById("date");
      if (inputDate) {
        inputDate.setAttribute("min", d);
      }
    }
  }, [props.value]);

  const dispatch = useDispatch();

  const validateTeamName = (e: any) => {
    if (
      (e.target.value.length > 0 && e.target.value.length < 4) ||
      e.target.value > 24
    ) {
      dispatch(teamNameFalse());
    } else {
      dispatch(teamNameTrue());
    }
  };

  const validateTeamDescription = (e: any) => {
    if (
      (e.target.value.length > 0 && e.target.value.length < 4) ||
      e.target.value > 254
    ) {
      dispatch(teamDescriptionFalse());
    } else {
      dispatch(teamDescriptionTrue());
    }
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.insideForm}>
        <form onSubmit={props.submitted}>
          <EditInput
            value={props.inputOne}
            valid={validateTeamName}
            validator="teamName"
          />
          <EditInput
            value={props.inputTwo}
            valid={validateTeamDescription}
            validator="teamDescription"
          />
          {props.inputOne.includes("Project") ? <DataInput /> : null}
          <Button>Create</Button>
        </form>
      </div>
    </div>
  );
};

export default Form;
