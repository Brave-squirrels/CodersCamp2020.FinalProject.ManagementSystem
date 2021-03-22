import axios from "axios/axiosMain";
import Form from "components/UI/formElements/Teams&ProjectCreate/form";
import { useHistory } from "react-router";

const CreateTeam = () => {
  const history = useHistory();

  const createTeam = async (e: any, data: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .post("/teams", data, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then(() => console.log("succes!"))
      .catch((err) => console.log(err.message));
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
