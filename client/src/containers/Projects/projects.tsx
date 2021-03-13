import BigRectangle from "../../components/UI/bigRectangle/bigRectangle";
import Square from "../../components/UI/square/square";

import classes from "./projects.module.scss";

const Projects = () => {
  return (
    <div className={classes.projectsRectangle}>
      <p>Your Projects!</p>
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

export default Projects;
