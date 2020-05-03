import actionTypes from '../constants/actionType';
import runtimeEnv from "@mars/heroku-js-runtime-env";

function userLoggedOut(){
    localStorage.setItem("username"," ")
    localStorage.setItem("token","")
    return {
        type: actionTypes.USER_LOGGEDOUT,
        username: " ",
        loggedIn: false
    }
}

export function submitLogout(){
    return dispatch => {
        const env = runtimeEnv();
        return fetch(`${env.REACT_APP_API_URL}/logout`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({email:localStorage.getItem('email')}),
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( res=>{
                if(res.success) {
                    dispatch(userLoggedOut());
                }
            })
            .catch((e) => {
                    console.log(e)
                    return e
                }
            )
    }
}