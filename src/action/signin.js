import actionTypes from '../constants/actionType';
import runtimeEnv from "@mars/heroku-js-runtime-env";
import {createBrowserHistory} from "history";
const history = createBrowserHistory();
const env = runtimeEnv();

function userLoggedIn(username){
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username,
        loggedIn: true
    }
}

export function submitLogin(data){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                localStorage.setItem('email', res.email);
                localStorage.setItem('username', res.name);
                localStorage.setItem('alias', res.alias);
                localStorage.setItem('token', res.token);
                dispatch(userLoggedIn(res.name));
                history.push('/')
                window.location.href = '/'
            })
            .catch( (e) => console.log(e) );
    }
}

export function submitRegister(data){
    const env = runtimeEnv();
    console.log(data)
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                if(res.success) {
                    dispatch(submitLogin(data));
                }
                else{
                    alert("Your email or password is invalid")
                }
            })
            .catch( (e) => console.log(e) );
    }
}

