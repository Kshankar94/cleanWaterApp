import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';




class Admin extends Component{

	render(){
		return(
		<div>	
			<button> Reported Data</button>
			<button> Mapped Data</button>
			<button> Check Map</button>
			<button> Logout</button>
		</div>
	);
}
}

export default Admin;
