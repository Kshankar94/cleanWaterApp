import React, { Component } from 'react';
import fire from './Fire';
import ReactDOM from "react-dom";
import Button from 'react-bootstrap/Button';
import './Reporteddata.css'

class Mappeddata extends Component {

constructor(props) {
    super(props);
    this.state = {
      form: [],
      
    };

   
  }

  
getData(data){
    var dataVal = data;
    
    var keys = Object.keys(dataVal);
	for(var i = 0; i< keys.length; i++){
		
		const { name, email, phone, message, address, latitude, longitude,isLowSeverity } = dataVal[keys[i]];
		const values = { name, email, phone, message, address, latitude, longitude,isLowSeverity };
		this.setState({ form: [values].concat(this.state.form) });
	}
	
	
}


componentWillMount() {

    let formRef = fire.database().ref('form/map/').orderByKey();
     var keys;
     var data;
    formRef.once('value', snapshot => {
      data = snapshot.val();
      keys = Object.keys(snapshot.val());
     
      this.getData(data);
      
    })
    
   
  }

	



render(){
	
	
	return(
		
		<div className='container' style={{ padding: `40px 0px` }}>
          <div className='row'>
		<div className='col-sm-12'>
	      <div className='row'>
	        {this.state.form.map((form,i) =>
	          <div className='col-sm-6' style={{ margin: `0px 0px 30px 0px` }}>
	            <div className={form.isLowSeverity==true ? 'card low' :'card high'}  id={i}>

	              <div className='card-body'>

	                <h4 className='card-title'>{form.address}</h4>
	                 <p className='card-text'>{form.message}</p>
	                <h6 className='card-subtitle mb-2 text-muted'>{form.name}</h6>
	                
	               
	                <a href={`tel:${form.phone}`} className='card-link'>{form.phone}</a>
	                <a href={`mailto:${form.email}`} className='card-link'>{form.email}</a>
	                
	              </div>
	            </div>
	          </div>)}
	      </div>
		</div>
		</div>

		</div>

	          
	    );
}
}

export default Mappeddata

