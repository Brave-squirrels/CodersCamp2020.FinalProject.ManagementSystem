import Form from "components/UI/formElements/Teams&ProjectCreate/form";

const CreateTeam = () => {
  const createTeam = async (e: any) => {
    e.preventDefault();
    console.log(1);
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
