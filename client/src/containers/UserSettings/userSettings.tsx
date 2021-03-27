import React, { useState } from "react";
import Input from "components/UI/formLogged/input/input";
import Button from "components/UI/formElements/button/button";
import Modal from "components/Modal/modal";
import classes from "./userSettings.module.scss";

const UserSettings = () => {
  const [modalState, setModalState] = useState(false);

  return (
    <div className={classes.userSettingsContainer}>
      <div className={classes.profile}>
        <h2>Profile</h2>
        <h4 className={classes.settingsLabel}>Name</h4>
        <div className={classes.name}>
          <Input
            type={"text"}
            inputValue={""}
            onChangeInput={""}
            label={"name"}
            validity={false}
            touched={false}
            inputType={"input"}
          />
          <Button>EDIT</Button>
        </div>
        <h4 className={classes.settingsLabel}>email</h4>
        <Input
          type={"text"}
          inputValue={"example@mail.com"}
          onChangeInput={""}
          label={""}
          validity={false}
          touched={false}
          inputType={"input"}
        />
      </div>
      <div className={classes.password}>
        <h2>Password</h2>
        <div className={classes.passwordContainer}>
          <div>
            <h4 className={classes.settingsLabel}>old password</h4>
            <Input
              type={"text"}
              inputValue={""}
              onChangeInput={""}
              label={"name"}
              validity={false}
              touched={false}
              inputType={"input"}
            />
          </div>
          <div>
            <h4 className={classes.settingsLabel}>new password</h4>
            <Input
              type={"text"}
              inputValue={""}
              onChangeInput={""}
              label={"name"}
              validity={false}
              touched={false}
              inputType={"input"}
            />
          </div>
          <div>
            <h4 className={classes.settingsLabel}>confirm</h4>
            <Input
              type={"text"}
              inputValue={""}
              onChangeInput={""}
              label={"name"}
              validity={false}
              touched={false}
              inputType={"input"}
            />
          </div>
          <Button>CHANGE</Button>
        </div>
      </div>
      <div className={classes.delete} onClick={() => setModalState(true)}>
        <p>Delete account</p>
      </div>
      <Modal show={modalState} onClose={() => setModalState(false)}>
        Test
      </Modal>
    </div>
  );
};

export default UserSettings;
