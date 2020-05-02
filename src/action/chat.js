import runtimeEnv from "@mars/heroku-js-runtime-env";


export function exitChat(){
    const env = runtimeEnv();
    let data = {'roomId': localStorage.getItem('roomId')}
    return fetch(`${env.REACT_APP_API_URL}/room`, {
            method: 'delete',
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
                }
            )
}