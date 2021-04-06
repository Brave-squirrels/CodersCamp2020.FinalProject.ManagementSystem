import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import ErrorHandler from "components/errorHandler/errorHandler";
import Spinner from "components/UI/Spinner/spinner";

import { mutateToAxios } from "utils/onChangeForm";
import { updateProjectInfoFetch } from "reduxState/projects/updateProjectInfo";
import { RootState } from "reduxState/store";

import styles from "./changeDescription.module.scss";

const ChangeInfo = () => {
  const dispatch = useDispatch();
  const projectInfo = useSelector(
    (state: RootState) => state.singleProjectData
  );

  const editStages = useSelector((state: RootState) => state.updateProjectInfo);

  const { teamId, projectId } = useParams<types.TParams>();

  const [form, setForm] = useState({
    projectName: {
      val: "",
      inputType: "input",
      type: "text",
      label: "Project Name",
      validation: {
        required: true,
        minLength: 3,
        maxLength: 24,
      },
      touched: false,
      valid: true,
    },
    content: {
      val: "",
      inputType: "textarea",
      label: "Description",
      validation: {
        required: true,
        maxLength: 254,
      },
      touched: false,
      valid: true,
    },
    deadline: {
      val: "",
      inputType: "input",
      type: "date",
      label: "Deadline",
      validation: {
        required: true,
        minDate: Date.now(),
      },
      touched: false,
      valid: true,
    },
    formValid: true,
  });

  useEffect(() => {
    let date: RegExpMatchArray | null;
    if (projectInfo.project.deadline) {
      date = projectInfo.project.deadline.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);
    }
    setForm((prevState) => {
      return {
        ...prevState,
        projectName: {
          ...prevState.projectName,
          val: projectInfo.project.projectName || "",
        },
        content: {
          ...prevState.content,
          val: projectInfo.project.content || "",
        },
        deadline: {
          ...prevState.deadline,
          val: date ? date[0] : "",
        },
      };
    });
  }, [
    projectInfo.project.projectName,
    projectInfo.project.content,
    projectInfo.project.deadline,
  ]);

  const editFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = mutateToAxios(form);
    dispatch(updateProjectInfoFetch(teamId, projectId, formData));
  };

  return (
    <div className={styles.formWrapper}>
      {editStages.loading ? (
        <Spinner />
      ) : (
        <>
          <FormStructure
            state={form}
            setState={setForm}
            btnText="Edit"
            formTitle="Edit project info"
            checkPass={false}
            submitted={(e: React.FormEvent<HTMLFormElement>) =>
              editFormHandler(e)
            }
          />
          {editStages.error && (
            <ErrorHandler>{editStages.error.response.data}</ErrorHandler>
          )}
        </>
      )}
    </div>
  );
};

export default ChangeInfo;
