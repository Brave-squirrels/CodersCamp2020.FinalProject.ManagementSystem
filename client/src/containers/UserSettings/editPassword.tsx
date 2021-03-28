import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectOldPassword,
  selectNewPassword,
  selectConfirm,
  setOldPassword,
  setNewPassword,
  setConfirm,
  changePassword,
  selectError,
  selectSuccess,
  toggleSuccess,
} from "reduxState/settingsSlice";
import Modal from "components/Modal/modal";
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
  const success = useSelector(selectSuccess);

  const handleChange = (e: E, callback: any) => {
    const { value } = e.currentTarget;
    dispatch(callback(value));
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
            onChangeInput={(e: E) => handleChange(e, setOldPassword)}
            label={""}
            validity={true}
            minLength={8}
            maxLength={255}
            touched={false}
            inputType={"input"}
          />
        </div>
        <div>
          <h4 className={classes.settingsLabel}>new password</h4>
          <Input
            type={"password"}
            inputValue={newPassword}
            onChangeInput={(e: E) => handleChange(e, setNewPassword)}
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
            onChangeInput={(e: E) => handleChange(e, setConfirm)}
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
      <Modal
        show={success}
        onClose={() => dispatch(toggleSuccess(false))}
        height={"200px"}
        width={"400px"}
      >
        <div className={classes.modal}>
          <h2 className={classes.success}>Success!</h2>
          <br />
          <div>
            <Button clicked={() => dispatch(toggleSuccess(false))}>ok</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditPassword;
