import Form from "components/UI/formElements/Teams&ProjectCreate/form";

const CreateProject = () => {
  const createProject = async () => {
    console.log(1);
  };

  return (
    <Form
      inputOne="Project Name"
      inputTwo="Project Description"
      submitted={createProject}
    ></Form>
  );
};

export default CreateProject;
