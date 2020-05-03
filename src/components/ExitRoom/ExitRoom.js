import React from "react";
import {exitChat} from "../../action/chat";
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

class ExitRoom extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let data = {'roomId': localStorage.getItem('roomId'),'email': localStorage.getItem('email')}
        exitChat(data).then(res =>{


            if (res.success) {
                    if(localStorage.getItem('feedback') === "true"){
                        history.push('/rating')
                        window.location.href = '/rating'
                    }
                    else {
                        alert(`Hey, you leave early, continue in your quest`)
                        localStorage.setItem('roomId', "")
                        history.push('/')
                        window.location.href = '/'
                    }

                    }


                })

    }


    render() {
        return ( //passing room={room} in InfoBar component as we are sending the room name dynamically
            <div>
            </div>
        )
    }
}

export default ExitRoom