import React, { FunctionComponent, useState } from "react";

import { useSelector } from "react-redux";
import { selectTeams } from "reduxState/userSlice";

import Card from "components/UI/Card/card";
import CardContainer from "components/UI/CardContainer/cardContainer";
import classes from "./user.module.scss";
import Button from "components/UI/formElements/button/button";
import NavigationItem from "components/UI/navigationItem/navigationItem";
import CreateTeam from "../Teams/createTeam/createTeam";
import Modal from "components/Modal/modal";

const UserTeams: FunctionComponent = () => {
  const teams = useSelector(selectTeams);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <>
          <CreateTeam />
        </>
      </Modal>
      <CardContainer title="Your Teams">
        <div className={classes.innerWrapper}>
          {teams && teams.length ? (
            teams.map(({ name, id }) => (
              <NavigationItem path={`/teams/${id}`} key={id}>
                <Card key={id}>
                  <h3 className={classes.cardHeader}>{name}</h3>
                </Card>
              </NavigationItem>
            ))
          ) : (
            <div>You have not joined any teams yet...</div>
          )}
          <Button clicked={() => setShowModal(true)}>New Team</Button>
        </div>
      </CardContainer>
    </>
  );
};

export default UserTeams;
