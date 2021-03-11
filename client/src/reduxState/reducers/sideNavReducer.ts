import * as actionTypes from '../actions/types';

const initState = {
    open: false
}

const reducer = (state = initState, action: any) => {
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