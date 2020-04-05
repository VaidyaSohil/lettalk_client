import actionTypes from '../constants/actionType';

function userLoggedOut(){
    return {
        type: actionTypes.USER_LOGGEDOUT,
        username: " ",
        loggedIn: false
    }
}

export function submitLogout(){
    return dispatch => {
        dispatch(userLoggedOut());
    }
}