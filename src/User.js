import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Checkmap from './Checkmap'
import fire from './Fire';
import UserCheckMap from './UserCheckMap'
import Home from './Home'




class User extends Component{

 constructor(props) {

  super(props);
        this.logout = this.logout.bind(this);
}


 logout() {
        fire.auth().signOut();
    }


render(){
    return(
    <div>


<Router>

      <Nav fill variant="tabs" defaultActiveKey="/Home">
        <Nav.Item>
          <Nav.Link className='navitem' as={Link} style={{ textDecoration: 'none' }} to="/Home">Report an issue</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  className='navitem' as={Link} style={{ textDecoration: 'none' }} to ="/Checkmap">Check clean water areas around you</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='navitem' onClick={this.logout}>Log out</Nav.Link>
        </Nav.Item>
        
      </Nav>
      <Route path ="/Home" exact strict component={Home} />
      
      <Route path ="/Checkmap" exact strict component={Checkmap} />
        
    </Router>

      </div>
  );
}
}

export default User;
