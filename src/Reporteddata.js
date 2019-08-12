import React, { Component } from 'react';
import fire from './Fire';
import ReactDOM from "react-dom";
//import Button from 'react-bootstrap/Button';
import './Reporteddata.css'

class Reporteddata extends Component {

constructor(props) {
    super(props);
    this.state = {
      form: [],
       alert:false,
        alertData:'',
      
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

    let formRef = fire.database().ref('form/3L5Te8khhLfGgNRI1tu8KPzTXmp2/').orderByKey();
     var keys;
     var data;
    formRef.once('value', snapshot => {
      data = snapshot.val();
      keys = Object.keys(snapshot.val());
     
      this.getData(data);
      
    })
    
   
  }

	toMap(id){
		 //e.preventDefault();
		 console.log(id);

		 const params = {
          
          address: this.state.form[id].address,
          latitude: this.state.form[id].latitude,
          longitude: this.state.form[id].longitude,
          isLowSeverity: this.state.form[id].isLowSeverity,
          name: this.state.form[id].name,
          message: this.state.form[id].message,
          phone: this.state.form[id].phone,
          email: this.state.form[id].email,
          
        };
        
		
		fire.database().ref('form/map').push(params).then(() => {
            this.setState({
            	alert:true,
            	alertData:"Mapped the address successfully",
            });
          }).catch((error) => {
            
            alert(error);
          });

          this.state.form.splice(id,1);

          this.setState({

          		form: this.state.form,
          		 

          });




          



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
	                <a href={`mailto:${form.email}`} className='card-link'>{form.email}&nbsp;&nbsp;&nbsp;</a>
	                <button type="button" class="btn btn-secondary btnpos" onClick={() => this.toMap(i)}>Map</button>
	                
	              </div>
	            </div>
	          </div>)}
	      </div>
		</div>
		</div>

		
		<div>
		{this.state.alert ?
          <div class="alert alert-success">
  				<strong>Data successfully mapped</strong>
			</div>: null }
       
        </div>
</div>
	          
	    );
}
}

export default Reporteddata

/*style={{ bg: form.isLowSeverity? 'green': 'red'}}
className={form.isLowSeverity==true ? 'card green' :'card red'}

<div className='card' id={i}>*/



/*<Button variant="primary" size="sm" onClick={() => this.toMap(i)}>Map</Button>*/