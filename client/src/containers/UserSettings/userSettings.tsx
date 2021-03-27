import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "reduxState/store";

import Input from "components/UI/formLogged/input/input";
import Button from "components/UI/formElements/button/button";
import Modal from "components/Modal/modal";
import EditName from "./editName";
import EditPassword from "./editPassword";
import classes from "./userSettings.module.scss";

const UserSettings = () => {
  const user = useSelector((state: RootState) => state.login.userInformation);
  const [modalState, setModalState] = useState(false);

  return (
    <div className={classes.userSettingsContainer}>
      <div className={classes.profile}>
        <h2>Profile</h2>
        <EditName />
        <h4 className={classes.settingsLabel}>email</h4>
        <Input
          type={"text"}
          inputValue={`${user.email}`}
          onChangeInput={null}
          label={""}
          validity={false}
          touched={false}
          inputType={"input"}
          turnOff={true}
        />
      </div>
      <div className={classes.password}>
        <h2>Password</h2>
        <EditPassword />
      </div>
      <div className={classes.delete} onClick={() => setModalState(true)}>
        <p>Delete account</p>
      </div>
      <div>
        <Modal
          show={modalState}
          onClose={() => setModalState(false)}
          height={"250px"}
          width={"600px"}
        >
          <div className={classes.modal}>
            <h2>Are you sure you want to delete your account?</h2>
            <p>Thist action can't be undone</p>
            <div>
              <Button btnType="danger">cancel</Button>
              <Button btnType="danger">delete</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserSettings;
