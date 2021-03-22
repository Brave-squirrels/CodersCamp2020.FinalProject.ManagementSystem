import { useEffect, useState } from "react";
import Button from "../button/button";

import classes from "./form.module.scss";

import EditInput from "../inputsToEdit/inputEdit";
import DataInput from "../dataInput/dataInput";
import { useDispatch, useSelector } from "react-redux";
import { teamDescription, teamName } from "reduxState/teamInfoSlice";

interface TeamData {
  teamName: string;
  description: string;
}

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

  const teamData = useSelector((state: any) => state.inputValidation);
  const [data, setData] = useState({ teamName: "", description: "" });
  const [valid, setValid] = useState(true);

  const dispatch = useDispatch();

  const saveData = (e: any, type: keyof TeamData) => {
    switch (type) {
      case "teamName":
        dispatch(teamName({ value: e.target.value }));
        setData({ ...data, teamName: e.target.value });
        break;
      case "description":
        dispatch(teamDescription({ value: e.target.value }));
        setData({ ...data, description: e.target.value });
    }
  };

  useEffect(() => {
    setValid(teamData.teamName && teamData.teamDescription);
  }, [teamData]);

  return (
    <div className={classes.formContainer}>
      <div className={classes.insideForm}>
        <form onSubmit={(e: any) => props.submitted(e, data)}>
          <EditInput
            value={props.inputOne}
            valid={(e: any) => saveData(e, "teamName")}
            validator="teamName"
          />
          <EditInput
            value={props.inputTwo}
            valid={(e: any) => saveData(e, "description")}
            validator="teamDescription"
          />
          {props.inputOne.includes("Project") ? <DataInput /> : null}
          <Button disabled={!valid}>Create</Button>
        </form>
      </div>
    </div>
  );
};

export default Form;
