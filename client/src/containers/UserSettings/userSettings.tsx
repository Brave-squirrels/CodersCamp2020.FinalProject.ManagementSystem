import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "reduxState/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";

import { changeName, setName, selectName } from "reduxState/settingsSlice";
import Input from "components/UI/formLogged/input/input";
import Button from "components/UI/formElements/button/button";
import Modal from "components/Modal/modal";
import classes from "./userSettings.module.scss";

const UserSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.login.userInformation);
  const name = useSelector(selectName);
  const [modalState, setModalState] = useState(false);
  const [active, setActive] = useState(true);
  const [btnName, setBtnName] = useState("EDIT");

  useEffect(() => {
    dispatch(setName(`${user.name}`));
  }, [user.name]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNameChange = ({
    currentTarget,
  }: React.FormEvent<HTMLInputElement>) => {
    dispatch(setName(currentTarget.value));
  };

  const editName = () => {
    dispatch(changeName({ name }));
    setActive(!active);
    setBtnName(active ? "SAVE" : "EDIT");
  };

  return (
    <div className={classes.userSettingsContainer}>
      <div className={classes.profile}>
        <h2>Profile</h2>
        <h4 className={classes.settingsLabel}>Name</h4>
        <div className={classes.name}>
          <Input
            type={"text"}
            inputValue={name}
            onChangeInput={handleNameChange}
            label={""}
            validity={false}
            touched={false}
            inputType={"input"}
            turnOff={active}
          />
          {!active && (
            <FontAwesomeIcon className={classes.icon} icon={faUndoAlt} />
          )}

          <Button clicked={editName}>{btnName}</Button>
        </div>
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
      {/* <div className={classes.password}>
        <h2>Password</h2>
        <div className={classes.passwordContainer}>
          <div>
            <h4 className={classes.settingsLabel}>old password</h4>
            <Input
              type={"password"}
              inputValue={password}
              onChangeInput={({
                currentTarget,
              }: React.FormEvent<HTMLInputElement>) =>
                setPassword(currentTarget.value)
              }
              label={""}
              validity={false}
              touched={false}
              inputType={"input"}
            />
          </div>
          <div>
            <h4 className={classes.settingsLabel}>new password</h4>
            <Input
              type={"password"}
              inputValue={"12345"}
              onChangeInput={null}
              label={""}
              validity={false}
              touched={false}
              inputType={"input"}
            />
          </div>
          <div>
            <h4 className={classes.settingsLabel}>confirm</h4>
            <Input
              type={"password"}
              inputValue={"12345"}
              onChangeInput={null}
              label={""}
              validity={false}
              touched={false}
              inputType={"input"}
            />
          </div>
          <Button>CHANGE</Button>
        </div>
      </div> */}
      <div className={classes.delete} onClick={() => setModalState(true)}>
        <p>Delete account</p>
      </div>
      <div>
        <Modal
          show={modalState}
          onClose={() => setModalState(false)}
          height={"250px"}
        >
          <div className={classes.modal}>
            <h2>Are you sure you want to delete your account?</h2>
            <p>Thist action can't be undone</p>
            <div>
              <button>cancel</button>
              <button>delete</button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserSettings;
