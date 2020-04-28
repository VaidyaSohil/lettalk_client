import React, { Component } from 'react';
import {Navbar, NavItem, Nav,Container} from 'react-bootstrap';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import {submitLogout} from '../../action/signout'



class LetTalkHeader extends Component {
    constructor(props) {
        super(props);
    }
    handleLogout(){
        const {dispatch} = this.props;
        dispatch(submitLogout())
    }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand><Link to="/">LET TALK</Link></Navbar.Brand>
                      <Nav className="ml-auto">
                          <Container >
                              {
                                  this.props.loggedIn ? (
                                      <div >
                                         <NavItem > < Link to="/chat" >Chat</Link></NavItem>
                                         <NavItem > < Link to="/profile" >Profile</Link></NavItem>
                                         <NavItem > < Link to="/" onClick={this.handleLogout.bind(this)}>Logout</Link></NavItem>
                                      </div>
                                      )
                                  : (<NavItem><Link to="/login">Login</Link></NavItem>)
                              }
                          </Container>
                        </Nav>

                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}
export default connect(mapStateToProps)(LetTalkHeader)
