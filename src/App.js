import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import{ BrowserRouter as Router, Route} from 'react-router-dom';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Sign_in from './components/Signin/signin'
import Landing_Page from './components/LandingPage/LandingPage'
import LetTalkHeader from "./components/lettalkheader/lettalkheader";
import Profile from './components/profile/profile'
import store from './stores/stores'
import { Provider } from 'react-redux'



const App = () =>(
    <Provider store={store}>
        <Router>
            <LetTalkHeader/>
            <Route path="/" exact component={Landing_Page}/>
            <Route path="/login" exact component={Sign_in}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/chat" exact component={Chat}/>
        </Router>
    </Provider>
)

export default App;