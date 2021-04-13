import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxState/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";

import {
  changeName,
  setName,
  selectName,
  selectActiveName,
  selectBtnName,
  toggleActiveName,
  toggleBtnName,
} from "reduxState/settingsSlice";
import Input from "components/UI/formLogged/input/input";
import Button from "components/UI/formElements/button/button";
import classes from "./userSettings.module.scss";

const EditName = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.userInformation);
  const name = useSelector(selectName);
  const activeName = useSelector(selectActiveName);
  const btnName = useSelector(selectBtnName);

  useEffect(() => {
    dispatch(setName(`${user.name}`));
  }, [user.name]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNameChange = ({
    currentTarget,
  }: React.FormEvent<HTMLInputElement>) => {
    dispatch(setName(currentTarget.value));
  };

  const editName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !activeName && dispatch(changeName({ name }));
    dispatch(toggleActiveName());
    dispatch(toggleBtnName());
  };

  const reset = () => {
    dispatch(toggleActiveName());
    dispatch(toggleBtnName());
    dispatch(setName(`${user.name}`));
  };

  return (
    <>
      <h4 className={classes.settingsLabel}>Name</h4>
      <form onSubmit={editName} className={classes.name}>
        <Input
          type={"text"}
          inputValue={name}
          onChangeInput={handleNameChange}
          label={""}
          validity={true}
          minLength={4}
          maxLength={50}
          touched={false}
          inputType={"input"}
          turnOff={activeName}
        />
        <div className={classes.btnContainer}>
          <FontAwesomeIcon
            className={`${classes.icon} ${!activeName && classes.iconShow}`}
            onClick={reset}
            icon={faUndoAlt}
          />
          <div className={activeName ? classes.btnReset : classes.btnShift}>
            <Button>{btnName}</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditName;
