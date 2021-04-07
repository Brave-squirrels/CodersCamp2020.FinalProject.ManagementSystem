import React from "react";
import Button from "components/UI/formElements/button/button";
import { useSelector} from "react-redux";
import axios from "axios/axiosMain";
import { useHistory } from "react-router-dom";




const LeaveTeam = () => {
    const history = useHistory();
    const state = useSelector((state: any) => state.singleTeamData);
    const teamId = state.team._id;

    const leaveTeamHandler = () => {
        axios
            .put(`/teams/${teamId}/leaveTeam`, {} , {
                headers: { "x-auth-token": localStorage.getItem("token") },
            })
            .then(() => {
                console.log('Success!')
                history.push('/');
            })
            .catch((err) => console.log('Something went wrong!'));
    }


  return (
    <Button clicked={leaveTeamHandler} btnType="danger">
      Yes
    </Button>
  );
};

export default LeaveTeam