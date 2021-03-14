interface Rules {
    required: boolean;
    minLength: number;
    maxLength: number;
  }

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


    return isValid;
  };

  export default validation;