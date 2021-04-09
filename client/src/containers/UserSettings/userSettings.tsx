import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "reduxState/store";

import Input from "components/UI/formLogged/input/input";
import EditName from "./editName";
import EditPassword from "./editPassword";
import DeleteAccount from "./deleteAccount";
import classes from "./userSettings.module.scss";
import Square from "components/UI/square/square";

const UserSettings = () => {
  const user = useSelector((state: RootState) => state.login.userInformation);

  return (
    <div className={classes.userSettingsContainer}>
      <Square>
        <div className={classes.settingsContainer}>
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
          <DeleteAccount />
        </div>
      </Square>
    </div>
  );
};

export default UserSettings;
