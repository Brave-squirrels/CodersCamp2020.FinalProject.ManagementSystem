import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as types from "utils/types";

import FormStructure from "components/UI/formLogged/formStructure/formStructure";
import Spinner from "components/UI/Spinner/spinner";
import ErrorHandler from "components/errorHandler/errorHandler";
import AlignVert from "hoc/alignVert/alignVert";

import { mutateToAxios } from "utils/onChangeForm";

import { RootState } from "reduxState/store";
import { updateProjectStatusFetch } from "reduxState/projects/updateStatus";

const ChangeStatus = () => {
  const dispatch = useDispatch();
  const { teamId, projectId } = useParams<types.TParams>();

  const projectData = useSelector(
    (state: RootState) => state.singleProjectData
  );
  const changeStatusStages = useSelector(
    (state: RootState) => state.updateProjectStatus
  );

  useEffect(() => {
    setForm((prevState) => {
      return {
        ...prevState,
        status: {
          ...prevState.status,
          val: projectData.project.status,
        },
      };
    });
  }, [projectData.project.status]);

  const [form, setForm] = useState({
    status: {
      val: "",
      inputType: "select",
      label: "Project status",
      validation: {
        required: true,
      },
      options: {
        inprogress: {
          val: "InProgress",
          name: "In progress",
        },
        abandoned: {
          val: "Abandoned",
          name: "Abandoned",
        },
        done: {
          val: "Done",
          name: "Done",
        },
      },
      touched: false,
      valid: true,
    },
    formValid: true,
  });

  const handleChangeStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = mutateToAxios(form);
    dispatch(updateProjectStatusFetch(teamId, projectId, formData));
  };

  return (
    <AlignVert>
      {changeStatusStages.loading ? (
        <Spinner />
      ) : (
        <>
          <FormStructure
            state={form}
            setState={setForm}
            btnText="Change"
            formTitle="Change status"
            checkPass={false}
            submitted={(e: React.FormEvent<HTMLFormElement>) =>
              handleChangeStatus(e)
            }
          />
          {changeStatusStages.error && (
            <ErrorHandler>
              {changeStatusStages.error.response.data}
            </ErrorHandler>
          )}
        </>
      )}
    </AlignVert>
  );
};

export default ChangeStatus;
