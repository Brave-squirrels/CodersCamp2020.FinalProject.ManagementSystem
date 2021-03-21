import axios from "axios";
import Form from "components/UI/formElements/Teams&ProjectCreate/form";
import { useHistory } from "react-router";

const CreateTeam = () => {
  const history = useHistory();

  const createTeam = async (e: any, data: any) => {
    e.preventDefault();
    axios
      .post("/teams", data)
      .then(() => console.log("succes!"))
      .catch((err) => history.push("/!@#$"));
  };

  return (
    <Form
      inputOne="Team Name"
      inputTwo="Team Description"
      submitted={createTeam}
    ></Form>
  );
};

export default CreateTeam;
