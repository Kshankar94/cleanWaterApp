import React, { Component } from 'react';
//import { withRouter , Link, NavLink} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Reporteddata from './Reporteddata'
import Mappeddata from './Mappeddata'
import fire from './Fire';
import Checkmap from './Checkmap'
import './Home.css'

class Admin extends Component{


logout() {
        fire.auth().signOut();
    }

	render(){
		return(
		<div>

		<Router>

			<Nav fill variant="tabs" defaultActiveKey="/Reporteddata">
			  <Nav.Item>
			    <Nav.Link className='navitem' as={Link} to ="/Reporteddata" style={{ textDecoration: 'none' }}>Reported Data</Nav.Link>
			  </Nav.Item>
			  <Nav.Item>
			    <Nav.Link  className='navitem' as={Link} to ="/Mappeddata" style={{ textDecoration: 'none' }}>Mapped Data</Nav.Link>
			  </Nav.Item>
			  <Nav.Item>
			    <Nav.Link className='navitem' as={Link} to ="/Checkmap" style={{ textDecoration: 'none' }}>Check Map</Nav.Link>
			  </Nav.Item>
			  <Nav.Item>
			    <Nav.Link className='navitem' style={{ textDecoration: 'none' }} onClick={this.logout}>Log out</Nav.Link>
			  </Nav.Item>
			  
			</Nav>
			<Route path ="/Reporteddata" exact strict component={Reporteddata} />
			<Route path ="/Mappeddata" exact strict component={Mappeddata} />
			<Route path ="/Checkmap" exact strict component={Checkmap} />
				
		</Router>
		</div>
	);
}
}

export default Admin;
