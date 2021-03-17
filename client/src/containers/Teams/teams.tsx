import BigRectangle from "../../components/UI/bigRectangle/bigRectangle";
import Square from "../../components/UI/square/square";

import classes from "./teams.module.scss";

const Teams = () => {
  return (
    <div className={classes.teamsRectangle}>
      <p>Your Teams!</p>
      <BigRectangle>
        <Square></Square>
        <Square></Square>
        <Square></Square>
        <Square></Square>
        <Square></Square>
        <Square></Square>
        <Square></Square>
      </BigRectangle>
    </div>
  );
};

export default Teams;