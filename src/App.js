import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import{ BrowserRouter as Router, Route} from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Sign_in from './components/SignIn/SignIn'
import Landing_Page from './components/LandingPage/LandingPage'
import LetTalkHeader from "./components/lettalkheader/lettalkheader";
import Profile from './components/profile/profile'
import Register from './components/register/register'
import store from './stores/stores'
import { Provider } from 'react-redux'
import history from './history';


const App = () =>(
    <Provider store={store}>
        <Router history={history}>
            <LetTalkHeader/>
            <Route path="/" exact component={Landing_Page}/>
            <Route path="/login" exact component={Sign_in}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/chat" exact component={Chat}/>
        </Router>
    </Provider>
)

export default App;