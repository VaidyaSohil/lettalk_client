import runtimeEnv from "@mars/heroku-js-runtime-env";
import {submitLogin} from "./signin";

export function getRating(){
    const env = runtimeEnv();
    return fetch(`${env.REACT_APP_API_URL}/rating?email=${localStorage.getItem('email')}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        mode: 'cors'
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .catch((e) => {
                console.log(e)
            }
        )
}
export function rating(data){
    const env = runtimeEnv();
    return fetch(`${env.REACT_APP_API_URL}/rating`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(data),
        mode: 'cors'
    })
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .catch((e) => {
                console.log(e)
            return e
            }
        )

}

export function exitChat(data){
    const env = runtimeEnv();
    return fetch(`${env.REACT_APP_API_URL}/room`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data),
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .catch((e) => {
                    console.log(e)
                    return e
                }
            )
}