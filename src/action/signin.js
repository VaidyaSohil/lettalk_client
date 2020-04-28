import actionTypes from '../constants/actionType';

function userLoggedIn(username){
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username,
        loggedIn: true
    }
}

export function submitLogin(data){
    return dispatch => {
        dispatch(userLoggedIn(data.username));
    }
}

