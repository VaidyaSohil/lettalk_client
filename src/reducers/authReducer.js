
import constants from '../constants/actionType'

var initialState = {
    loggedIn: localStorage.getItem('token') ? true : false,
    username: localStorage.getItem('username') ? localStorage.getItem('username') : " ",
}

export default (state = initialState, action) => {


    var updated = Object.assign({}, state);

    switch(action.type) {
        case constants.USER_LOGGEDIN:
            updated['loggedIn'] = action.loggedIn;
            updated['username'] = action.username;
            return updated;
        case constants.USER_LOGGEDOUT:
            updated['loggedIn'] = action.loggedIn
            updated['username'] = action.username
            return updated;
        default:
            return state;
    }
}