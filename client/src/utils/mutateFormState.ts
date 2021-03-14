const mutateState = (
    e: { target: HTMLInputElement },
    inputType: string,
    stateCopy: any,
    valid: boolean,
    passwordCheck?: boolean
) => {
    let inputFields;
    if (inputType === "password" && passwordCheck) {
      valid = valid && e.target.value === stateCopy.confirmPassword.val;
      inputFields = {
        ...stateCopy,
        [inputType]: {
          ...stateCopy[inputType],
          val: e.target.value,
          valid: valid,
          touched: e.target.value.length > 0,
        },
        confirmPassword: {
          ...stateCopy.confirmPassword,
          valid: valid,
        },
      };
    } else if (inputType === "confirmPassword" && passwordCheck) {
      valid = valid && e.target.value === stateCopy.password.val;
      inputFields = {
        ...stateCopy,
        [inputType]: {
          ...stateCopy[inputType],
          val: e.target.value,
          valid: valid,
          touched: e.target.value.length > 0,
        },
        password: {
          ...stateCopy.password,
          valid: valid,
        },
      };
    } else {
      inputFields = {
        ...stateCopy,
        [inputType]: {
          ...stateCopy[inputType],
          val: e.target.value,
          valid: valid,
          touched: e.target.value !== "",
        },
      };
    }
  
    return inputFields;
};

  export default mutateState;