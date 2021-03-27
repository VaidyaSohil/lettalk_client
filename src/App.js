import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import{ BrowserRouter as Router, Route} from 'react-router-dom';
import Chat from './components/Chat/Chat';
import Sign_in from './components/SignIn/SignIn'
import Landing_Page from './components/LandingPage/LandingPage'
import LetTalkHeader from "./components/lettalkheader/lettalkheader";
import Cors  from "./components/LandingPage/CORS";
import Secret from "./components/LandingPage/Secret";
import Profile from './components/profile/profile'
import Register from './components/register/register'
import Popup from './components/rating/Rating'
import store from './stores/stores'
import { Provider } from 'react-redux'
import history from './history';
import Rating from "./components/rating/Rating";
import ExitRoom from "./components/ExitRoom/ExitRoom";


const App = () =>(
    <Provider store={store}>
        <Router history={history}>
            <LetTalkHeader/>
            <Route path="/secret" exact component={Secret}/>
            <Route path="/CORS" exact component={Cors}/>
            <Route path="/" exact component={Landing_Page}/>
            <Route path="/login" exact component={Sign_in}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/profile" exact component={Profile}/>
            <Route path="/chat" exact component={Chat}/>
            <Route path="/rating" exact component={Rating}/>
            <Route path="/exitRoom" exact component={ExitRoom}/>
            <Route path="/testing" exact component={Rating}/>
        </Router>
    </Provider>
)

export default App;
