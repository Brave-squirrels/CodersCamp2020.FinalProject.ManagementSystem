interface Rules {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minDate?: any
  }

export const validation = (value: string,rules?: Rules) => {
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

  export const wholeFormValidity = (fields: any) => {
    let key: keyof typeof fields;
    for (key in fields) {
      if (fields[key].valid === false) {
        return false;
      }
    }
    return true;
  };
