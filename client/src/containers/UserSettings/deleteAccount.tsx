import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { deleteUser } from "reduxState/settingsSlice";
import Button from "components/UI/formElements/button/button";
import Modal from "components/Modal/modal";
import classes from "./userSettings.module.scss";
import { RootState } from "reduxState/store";

const DeleteAccount = () => {
  const [modalState, setModalState] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(
    (state: RootState) => state.login.userInformation
  );

  const deleteProfile = () => {
    dispatch(deleteUser(userData));
    history.push("/logout");
  };

  return (
    <>
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
            <p>This action can't be undone</p>
            <div>
              <Button clicked={() => setModalState(false)}>cancel</Button>
              <Button clicked={deleteProfile} btnType="danger">
                delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DeleteAccount;
