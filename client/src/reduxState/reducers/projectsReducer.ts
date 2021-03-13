interface Project {
  name: string;
  date: string;
  deadline: string;
}

interface State {
  projects: Project[];
}

const initialState = {
  projects: [],
};

interface Action {
  type: string;
}

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
