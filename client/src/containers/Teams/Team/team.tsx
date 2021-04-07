import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import ViewWithSidebar from "hoc/viewWithSidebar/viewWithSidebar";
import styles from "./team.module.scss";
import TeamSidebar from "./teamSideBar/teamSideBar";
import { CardWithTitle } from "components/UI/CardWithTitle/CardWithTitle";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import RightSideWrapper from "hoc/rightSideWrapper/rightSideWrapper";

import ChangeButton from "components/UI/changeButton/changeButton";
import Modal from "components/Modal/modal";

import AddMember from "containers/Teams/addMember/addMember";
import ChangeTitle from "containers/Teams/changeTitle/changeTitle";
import ChangeDescription from "containers/Teams/changeDescription/changeDescription";
import ChangeModerator from "containers/Teams/changeModerator/changeModerator";
import ChangeOwner from "containers/Teams/changeOwner/changeOwner";
import { fetchTeam } from "reduxState/teamDataSlice";

const Team = () => {
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [showModeratorModal, setShowModeratorModal] = useState(false);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  const state = useSelector((state: any) => state.singleTeamData);

  const moderatorsList = state.team.moderatorsId.map((moderatorId: string) =>
    state.team.members.map((member: any) => (
      <div key={member.userId}>
        {member.userId === moderatorId ? member.userName : null}
      </div>
    ))
  );

  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(fetchTeam(state.team._id));
    setShowModeratorModal(false);
    setShowTitleModal(false);
    setShowDescriptionModal(false);
  };

  const isModerator = state.team.moderatorsId.includes(
    localStorage.getItem("id")!
  );

  const isOwner = state.team.ownerId === localStorage.getItem("id");

  return (
    <>
      <Modal show={showMemberModal} onClose={() => setShowMemberModal(false)}>
        <AddMember />
      </Modal>

      <Modal show={showTitleModal} onClose={closeHandler}>
        <ChangeTitle />
      </Modal>

      <Modal show={showDescriptionModal} onClose={closeHandler}>
        <ChangeDescription />
      </Modal>

      <Modal show={showModeratorModal} onClose={closeHandler}>
        <ChangeModerator />
      </Modal>

      <Modal show={showOwnerModal} onClose={() => setShowOwnerModal(false)}>
        <ChangeOwner onClose={() => setShowOwnerModal(false)} />
      </Modal>

      <ViewWithSidebar>
        <TeamSidebar />
        {state.loading ? (
          <Spinner />
        ) : state.error ? (
          <ErrorHandler>Something went wrong...</ErrorHandler>
        ) : (
          <RightSideWrapper title={state.team.teamName}>
            {/* Container for team's info */}

            <div className={styles.buttonsWrapper}>
              {isOwner && (
                <ChangeButton
                  title={"Change Team Name"}
                  clicked={() => setShowTitleModal(true)}
                />
              )}
            </div>

            <div className={styles.container}>
              <div className={styles.firstColumn}>
                <CardWithTitle title={"Owner"}>
                  {state.team.members.map((member: any) =>
                    member.userId === state.team.ownerId
                      ? member.userName
                      : null
                  )}
                  {isOwner ? (
                    <ChangeButton
                      title={"Change owner"}
                      clicked={() => setShowOwnerModal(true)}
                    />
                  ) : null}
                </CardWithTitle>

                <CardWithTitle title={"Creation date"}>
                  {state.team.startDate.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)}
                </CardWithTitle>

                <CardWithTitle title={"Description"}>
                  {state.team.description}
                  {isModerator ? (
                    <ChangeButton
                      title={"Change description"}
                      clicked={() => setShowDescriptionModal(true)}
                    />
                  ) : null}
                </CardWithTitle>
              </div>

              <CardWithTitle title={"Members"}>
                {state.team.members.map((member: any) => (
                  <div key={member.userId}>{member.userName}</div>
                ))}
                {isModerator ? (
                  <ChangeButton
                    title={"Send invite"}
                    clicked={() => setShowMemberModal(true)}
                  />
                ) : null}
              </CardWithTitle>
              <CardWithTitle title={"Moderators"}>
                {moderatorsList}
                {isOwner ? (
                  <ChangeButton
                    title={"Change moderators"}
                    clicked={() => setShowModeratorModal(true)}
                  />
                ) : null}
              </CardWithTitle>
            </div>
          </RightSideWrapper>
        )}
      </ViewWithSidebar>
    </>
  );
};

export default Team;
