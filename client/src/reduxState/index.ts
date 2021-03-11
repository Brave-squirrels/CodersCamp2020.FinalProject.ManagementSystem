import {combineReducers} from 'redux';

import openSideNavReducer from './reducers/sideNavReducer';

const rootReducer = combineReducers({
    openSideNavReducer: openSideNavReducer
});

export default rootReducer;