interface Rules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minDate?: any
  }

  /* Input data validation 
    @param {value} - input value
    @param {rules} - object with validation rules
  */
const validation = (value: string,rules?: Rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if(rules.minDate){
      isValid = new Date(value) >= rules.minDate && isValid;
    }


    return isValid;
  };

  /* Check if every input is valid
    @param {fields} - object with all form fields
  */
  const wholeFormValidity = (fields: any) => {
    let key: keyof typeof fields;
    for (key in fields) {
      if (fields[key].valid === false) {
        return false;
      }
    }
    return true;
  };

  /* Mutate state
    @param {e} - target of the event
    @param {inputType} - type of input which is object key in state
    @params {stateCopy} - state
    @param {valid} - value which represents validity of whole form
    @param {passwordCheck} - boolean value to pass if we have to check if passwords are matching
  */
  const mutateState = (
    e: { target: HTMLInputElement },
    inputType: string,
    stateCopy: any,
    valid: boolean,
    passwordCheck?: boolean,
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
    }  else {
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


/* Main onChange action creator
    @param {e} - event target
    @param {inputType} - type of the input which represents key in an object
    @param {state} - state
    @param {checkPass} - boolean value to pass if we have to check if passwords are matching
*/
const onChangeForm = (e: {target:HTMLInputElement}, inputType: any, state: any, checkPass?: boolean)=>{

    const stateCopy = {...state};
    const inputField={
        ...stateCopy[inputType]
    }

    const valid: boolean = validation(e.target.value, inputField.validation);
    const updatedFields = mutateState(e, inputType, stateCopy, valid, checkPass);
    const validForm = wholeFormValidity(updatedFields);

    return{
        updatedFields,
        validForm
    }

}


export const mutateToAxios = (state : any) =>{
  const formData: any = {};
  let key: keyof typeof state;
  for(key in state){
    if(key==='formValid'){
      break
    }
    formData[key] = state[key].val;
  }
  return formData;
}

export default onChangeForm;