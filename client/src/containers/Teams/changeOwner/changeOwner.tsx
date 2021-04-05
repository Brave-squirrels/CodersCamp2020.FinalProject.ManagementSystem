import React, { useState } from "react";
import styles from "./changeOwner.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "reduxState/store";
import Button from "components/UI/formElements/button/button";

import axios from "axios/axiosMain";

const ChangeOwner = () => {
    const state = useSelector((state: any) => state.singleTeamData);
    const ownerId = state.team.ownerId;
    const teamMembers = state.team.members.filter(
        (member: any) => member.userId !== ownerId
    );
    const teamId = state.team._id;


    const changeOwner = (user: any) => {
        const formatData = { id: user.userId }
        axios
            .put(`/teams/${teamId}/changeTeamOwner`, formatData, {
                headers: { "x-auth-token": localStorage.getItem("token") },
            })
            .then(() => {
                console.log('Success!')
            })
            .catch((err) => console.log('Something went wrong!'));
    }

    const onClickHandler = (aa: any) => console.log(aa)
    

    const [opened, setOpened] = useState(false)
    const [memberId, setMemberId] = useState('')

    let classList 
    if (opened) classList = styles.confirm 
    else classList = styles.display


    return (
        <>
            <div className={classList}>
                <div className={styles.confirmWrapper}>
                    <h2>Are you sure?</h2>
                    <div className={styles.confirmModal}>
                        <Button clicked={() => setOpened(false)}>Cancel</Button>
                        <Button clicked={() => onClickHandler(memberId)} btnType="danger">Change</Button>
                    </div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.members}>
                    <h2>Members</h2>
                    {teamMembers.map((member: any) => (
                        <div key={member.userId}>
                            <div>{member.userName}</div>
                            <div
                                onClick={() => {
                                    setOpened(true)
                                    setMemberId(member.userId)
                                }}
                                className={styles.promote}
                            >
                                Promote
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
export default ChangeOwner;
