import runtimeEnv from "@mars/heroku-js-runtime-env";


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
                console.log(e)
            }
        )
}