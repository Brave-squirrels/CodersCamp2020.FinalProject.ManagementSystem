import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "reduxState/store";

import Card from "components/UI/Card/card";
import CardContainer from "components/UI/CardContainer/cardContainer";
import NavigationItem from "components/UI/navigationItem/navigationItem";
import SpinnerLight from "components/UI/spinnerLight/spinner";
import Modal from "components/Modal/modal";
import CreateTeam from "../Teams/createTeam/createTeam";
import AddNew from "components/UI/addNew/addNew";

import classes from "./user.module.scss";

const UserTeams: FunctionComponent = () => {
  const user = useSelector((state: RootState) => state.login.userInformation);
  const userStages = useSelector((state: RootState) => state.login);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <>
          <CreateTeam />
        </>
      </Modal>
      <CardContainer title="Your Teams">
        <div className={classes.createTeamWrapper}>
          <AddNew clicked={() => setShowModal(true)} />
        </div>
        <div className={classes.innerWrapper}>
          {userStages.loading ? (
            <SpinnerLight />
          ) : (
            <>
              {user.teams && user.teams.length ? (
                user.teams.map((el: any) => (
                  <NavigationItem path={`/teams/${el.id}`} key={el.id}>
                    <Card key={el.id}>
                      <h3 className={classes.cardHeader}>{el.name}</h3>
                    </Card>
                  </NavigationItem>
                ))
              ) : (
                <div>You have not joined any teams yet...</div>
              )}
            </>
          )}
        </div>
      </CardContainer>
    </>
  );
};

export default UserTeams;
