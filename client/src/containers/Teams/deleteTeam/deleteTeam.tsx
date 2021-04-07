import React, { useState } from "react";
import Button from "components/UI/formElements/button/button";
import { useSelector} from "react-redux";
import axios from "axios/axiosMain";
import { useHistory } from "react-router-dom";
import styles from "./deleteTeam.module.scss";

const DeleteTeam = () => {
    const history = useHistory();
    const state = useSelector((state: any) => state.singleTeamData);
    const teamId = state.team._id;
    const [showError, setShowError] = useState('')

    const deleteTeamHandler = () => {
        axios
            .delete(`/teams/${teamId}`, {
                headers: { "x-auth-token": localStorage.getItem("token") },
            })
            .then(() => {
                console.log('Success!')
                history.push('/');
            })
            .catch((err) => setShowError(err.response.data));
    }


  return (
    <>
    <Button clicked={deleteTeamHandler} btnType="danger">
      Yes
    </Button>
    <div className={styles.error}>{showError}</div>
    </>
  );
};

export default DeleteTeam