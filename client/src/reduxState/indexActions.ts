import openSideNav from './actions/sideNavAction';
import {createUser} from './actions/createUser';
import {loginUser, authUser, logout} from './actions/loginUser';

const allActions = {
    openSideNav,
    createUser,
    loginUser,
    authUser,
    logout
}

export default allActions;