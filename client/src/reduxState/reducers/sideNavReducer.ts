import * as actionTypes from '../actions/types';

const initState = {
    open: false
}

interface Action {
    type: string
}

const reducer = (state = initState, action : Action ) => {
    switch(action.type){
        case actionTypes.CLICK_HAMBURGER:
            return{
                ...state,
                open: !state.open
            }
        default:
            return state
    }
}

export default reducer;