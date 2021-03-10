import {combineReducers} from 'redux';

//Import reducers and add as an objects
import testReducer from './reducers/testReducer';

const rootReducer = combineReducers({
    testReducer: testReducer
});

export default rootReducer;