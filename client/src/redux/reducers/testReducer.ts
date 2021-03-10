import * as actionTypes from '../actions/types';

const initState = {
    show: false
}

//Reducer to change the state
const reducer = (state = initState, action: any)=>{
    switch(action.type){
        case actionTypes.TEST:
            return {
                ...state,
                show: !state.show
            }
        default: return state;
    }
}

export default reducer;