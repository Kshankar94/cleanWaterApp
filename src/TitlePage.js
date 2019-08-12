import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import App from './App'
import Adminlogin from './Adminlogin'
import Adminapp from './Adminapp'
import Admin from './Admin'
import Button from 'react-bootstrap/Button'
import './TitlePage.css'
import Buttonpage from './Buttonpage'
import title from './title.PNG'
import map from './map.png'




/*			
  <button type="button" class="btn btn-primary btn-sm">User</button>
  			

  			
<button type="button" class="btn btn-secondary btn-sm" disabled>Admin</button>
</div>*/

class TitlePage extends Component {
	constructor(props){
		super(props);
		this.state ={
		setLogin:false,
	}
	this.setClick = this.setClick.bind(this);
	}
	

    setClick(value){
    	return(
        value === true? <Adminapp/> : <App />
       
    		)
    }

    /*{!this.state.setLogin? <App /> : <Adminapp />}
    <img src={title} alt="title" className='title'/>*/

	render(){
	
  

		return(
			
      
    <div>
    
    
   
     <img src={title} alt="title" className='title'/>

    {!this.props.children?
    
     <Buttonpage getValue={this.setClick}/>
     :
     null}
     </div>
					
    
       
     







			);
	}

}

export default TitlePage;

/*<Navbar bg="primary" variant="dark">
								    <Navbar.Brand>Clean Water Report and Analysis</Navbar.Brand>
								    <Nav className="mr-auto">
								       <Nav.Link></Nav.Link>
								      <NavLink to ="/App" activeStyle={ {color: '#00008B'} }> Login as User  </NavLink>
								       <Nav.Link></Nav.Link>
								      <NavLink to ="/Admin" activeStyle={ {color: '#00008B'} }> Login as Admin </NavLink>
								      
								    </Nav>
								     
								  </Navbar>*/

/*<button as ={Link} className='btn btn-info btn-lg' to="/App">User</button>
								      <button className='btn btn-info btn-lg'><Link to="/Admin" style={{ textDecoration: 'none' }}>Admin</Link></button>*/

								  /*<div className="container">
						<div className="row">
							<div className="col-sm-12">


							
 
								<Link to="/App" style={{ textDecoration: 'none' }}><button className='btn btn-info btn-lg'>User</button></Link>
								
								<Link to="/Admin" style={{ textDecoration: 'none' }}><button className='btn btn-info btn-lg'>Admin</button></Link>

 
						
						
						<Route path ="/App" exact strict component={App} />
						<Route path ="/Admin" exact strict component={Admin} />
						
						</div>
					</div>
					</div>*/

/*<div>
				
				
					<Router>
						<Navbar bg="primary" variant="dark">
								    <Navbar.Brand>#cleanwaterToAll</Navbar.Brand>
								    <Nav className="mr-auto">
								       <Nav.Link></Nav.Link>
								      <NavLink to ="/App" activeStyle={ {color: '#00008B'} }> Login as User  </NavLink>
								       <Nav.Link></Nav.Link>
								      <NavLink to ="/Adminapp" activeStyle={ {color: '#00008B'} }> Login as Admin </NavLink>
								      
								    </Nav>
								     
								  </Navbar>
								  <Route path ="/App" exact strict component={App} />
						<Route path ="/Adminapp" exact strict component={Adminapp} />
					
				</Router>  	
						   	     
					
			</div>


			*/



			/*<div>
			<div className="container">
				<Router>
				<div className="row">

								  <div className=".cen">
								     <Link to="/App" style={{ textDecoration: 'none' }}><button>  Login </button></Link>
								  
								    
								      <Link to="/Adminapp" style={{ textDecoration: 'none' }}><button>Signup</button></Link>
								   </div>
							</div>

								 <Route path ="/App" exact strict component={App} />
						<Route path ="/Adminapp" exact strict component={Adminapp} />

								</Router>

					
					
					</div>
			</div>
				*/