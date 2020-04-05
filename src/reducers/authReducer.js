
import constants from '../constants/actionType'

var initialState = {
    username:  "",
    loggedIn:  false,
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