import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class First extends Component {
	render(){
		return(
			<nav className = "navbar navbar-default">
				<div className="container">
					<div className="navbar-header">
						<ul className="nav navbar-nav">
							<li><Link to={"/App"}> User</Link> </li>
							<li><Link to={"/Admin"}> Admin </Link></li>
						</ul>
					</div>
				</div>
			</nav>

			);
	}

}

export default First;