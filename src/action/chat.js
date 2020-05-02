import runtimeEnv from "@mars/heroku-js-runtime-env";

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
    console.log(data)
    alert("Call rating")
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
            }
        )

}

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