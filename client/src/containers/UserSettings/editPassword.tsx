import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectOldPassword,
  selectNewPassword,
  selectConfirm,
  setPasswordData,
  changePassword,
  selectError,
} from "reduxState/settingsSlice";
import ErrorHandler from "components/errorHandler/errorHandler";
import Input from "components/UI/formLogged/input/input";
import Button from "components/UI/formElements/button/button";
import classes from "./userSettings.module.scss";

type E = React.FormEvent<HTMLInputElement>;

const EditPassword = () => {
  const dispatch = useDispatch();
  const password = useSelector(selectOldPassword);
  const newPassword = useSelector(selectNewPassword);
  const confirm = useSelector(selectConfirm);
  const error = useSelector(selectError);

  const handleChange = (e: E, type: string) => {
    const { value } = e.currentTarget;
    dispatch(setPasswordData({ [type]: value }));
  };

  const editPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      changePassword({
        oldPassword: password,
        password: newPassword,
        confirmPassword: confirm,
      })
    );
  };

  return (
    <>
      <form className={classes.passwordContainer} onSubmit={editPassword}>
        <div>
          <h4 className={classes.settingsLabel}>old password</h4>
          <Input
            type={"password"}
            inputValue={password}
            onChangeInput={(e: E) => handleChange(e, "oldPassword")}
            label={""}
            validity={false}
            touched={false}
            inputType={"input"}
            minLength={8}
            maxLength={255}
          />
        </div>
        <div>
          <h4 className={classes.settingsLabel}>new password</h4>
          <Input
            type={"password"}
            inputValue={newPassword}
            onChangeInput={(e: E) => handleChange(e, "newPassword")}
            label={""}
            validity={false}
            touched={false}
            inputType={"input"}
            minLength={8}
            maxLength={255}
          />
        </div>
        <div>
          <h4 className={classes.settingsLabel}>confirm</h4>
          <Input
            type={"password"}
            inputValue={confirm}
            onChangeInput={(e: E) => handleChange(e, "confirm")}
            label={""}
            validity={false}
            touched={false}
            inputType={"input"}
            minLength={8}
            maxLength={255}
          />
        </div>
        <Button>CHANGE</Button>
      </form>
      <div className={classes.error}>
        <ErrorHandler>{error}</ErrorHandler>
      </div>
    </>
  );
};

export default EditPassword;
