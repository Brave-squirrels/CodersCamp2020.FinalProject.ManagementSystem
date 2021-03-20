import classes from "./createTeam.module.scss";

import Button from "components/UI/formElements/button/button";

const CreateTeam = () => {
  return (
    <div className={classes.formContainer}>
      <div className={classes.insideForm}>
        <form>
          <label className={classes.customField}>
            <input type="text" required />
            <span className={classes.placeholder}>Team Name</span>
          </label>
          <label className={classes.customField}>
            <input type="text" required />
            <span className={classes.placeholder}>Team Description</span>
          </label>
          <label className={classes.customField}>
            <Button>Create New Team</Button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
