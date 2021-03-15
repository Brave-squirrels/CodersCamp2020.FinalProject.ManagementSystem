/* Sample form creator */

import React, { useState } from "react";

import onChangeForm from "./onChangeForm";

import FormStructure from "../components/UI/formElements/formStructure/formStructure";

const SampleForm = () => {
  const [form, setForm] = useState({
    select: {
      inputType: "select",
      label: "Select",
      name: "Select1",
      val: "val2",
      options: {
        first: {
          name: "val1",
          val: "val1",
        },
        second: {
          name: "val2",
          val: "val2",
        },
      },
      valid: true,
    },
    email: {
      val: "",
      type: "email",
      inputType: "input",
      placeholder: "E-mail",
      label: "E-mail",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 50,
      },
      touched: false,
      valid: false,
    },
    date: {
      val: "",
      type: "date",
      inputType: "input",
      placeholder: "E-mail",
      label: "E-mail",
      validation: {
        required: true,
        minDate: Date.now(),
      },
      touched: false,
      valid: false,
    },
    textarea: {
      val: "",
      inputType: "textarea",
      placeholder: "lol",
      label: "Text",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 50,
      },
      touched: false,
      valid: false,
    },
    formValid: false,
  });

  /* Handle changes in signUp form */
  const handleFormChange = (
    e: { target: HTMLInputElement },
    inputType: keyof typeof form
  ) => {
    /* Mutate and valid state */
    const { updatedFields, validForm } = onChangeForm(e, inputType, form, true);

    /* Set up new state */
    setForm((prevState) => {
      return {
        ...prevState,
        ...updatedFields,
        formValid: validForm,
      };
    });
  };

  return (
    <div>
      <FormStructure
        state={form}
        onChangeHandler={handleFormChange}
        btnText="GO"
        formTitle="Sample form"
      />
    </div>
  );
};

export default SampleForm;
