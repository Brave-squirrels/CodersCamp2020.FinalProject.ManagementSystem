import React, { FunctionComponent, useState } from "react";

import { useSelector } from "react-redux";

import Card from "components/UI/Card/card";
import CardContainer from "components/UI/CardContainer/cardContainer";
import classes from "./user.module.scss";
import Button from "components/UI/formElements/button/button";
import NavigationItem from "components/UI/navigationItem/navigationItem";
import CreateTeam from "../Teams/createTeam/createTeam";
import Modal from "components/Modal/modal";

const UserTeams: FunctionComponent = () => {
  const user = useSelector((state: any) => state.login.userInformation);
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
          <Button clicked={() => setShowModal(true)}>New Team</Button>
        </div>
      </CardContainer>
    </>
  );
};

export default UserTeams;
