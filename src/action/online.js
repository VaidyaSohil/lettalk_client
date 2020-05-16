import runtimeEnv from "@mars/heroku-js-runtime-env";

export function checkIn(){
    const env = runtimeEnv();
    fetch(`${env.REACT_APP_API_URL}/checkin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({email:localStorage.getItem('email')}),
        mode: 'cors'})
        .then( (response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .catch( (e) => console.log(e) );
}

export function checkOnline(){
    const env = runtimeEnv();
    return fetch(`${env.REACT_APP_API_URL}/online`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
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
                return e
            }
        )
}