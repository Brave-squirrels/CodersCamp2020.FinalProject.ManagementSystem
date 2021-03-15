import openSideNav from './actions/sideNavAction';
import {createUser} from './actions/createUser';
import {loginUser, authUser} from './actions/loginUser';

const allActions = {
    openSideNav,
    createUser,
    loginUser,
    authUser
}

export default allActions;