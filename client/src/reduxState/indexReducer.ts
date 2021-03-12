import {combineReducers} from 'redux';

import openSideNavReducer from './reducers/sideNavReducer';

const rootReducer = combineReducers({
    openSideNavReducer: openSideNavReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;