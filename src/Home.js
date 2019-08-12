import React, { Component } from 'react';
import fire from './Fire';
import AutoComplete from "./autocomplete";
import ReactDOM from "react-dom";
import './Home.css';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Nav from 'react-bootstrap/Nav'
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route'
import UserCheckMap from './UserCheckMap'


class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        
        this.state = {
            form: [],
            alert:false,
            alertData:{},
            addrValue:'',
            geojson:{},
            //geoLocation:{}
            isGeo:false,
            isLow:true,
        };
        this.onData1Changed = this.onData1Changed.bind(this);
       this.setGeo = this.setGeo.bind(this);
       this.toSetSwitchvalue=this.toSetSwitchvalue.bind(this);
        this.handleData = this.handleData.bind(this);
        this.addressVal = '';
        //this.geoLocation = {};
        //this.geoLocation = '';
    }

    
    onData1Changed(newData1){
    this.setState({data1 : newData1}, ()=>{
      console.log('Data 1 changed by Sidebar');
    })
  }



    showAlert(type,message){
        this.setState({
            alert:true,
            alertData:{type, message}
        });

        setTimeout(() => {
      this.setState({ alert: false });
        }, 4000)
  }


    sendMessage(e){
        e.preventDefault();
        console.log("this is good");
        // console.log(id);
        // this.setGeo();
        console.log(this.state.isLow);
        var user = fire.auth().currentUser;
        var uid = user.uid;
        const params = {
          name: this.inputName.value,
          email: this.inputEmail.value,
          //city: this.inputCity.value,
          phone: this.inputPhone.value,
          message: this.textAreaMessage.value,
          address: this.addressVal,
          latitude: this.lat.value,
          longitude: this.lng.value,
          isLowSeverity: this.state.isLow,

          
        };



        if (params.name && params.email && params.phone && params.phone && params.message && params.address) {
          
          fire.database().ref('form/' + uid).push(params).then(() => {
            this.showAlert('success', 'Your message was sent successfull');
          }).catch((error) => {
            this.showAlert('danger', 'Your message could not be sent');
            console.log(error);
          });
          this.resetForm();
        } else {
          this.showAlert('warning', 'Please fill the form');
        };
      }
    resetForm() {
    this.refs.contactForm.reset();
    

  }

   
    
   
    handleData(result) {
     
      
    
      
    
       this.addressVal = result.title + result.description;
       

       this.setGeo();
       
     
        }
   
  setGeo(){

    fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${this.addressVal
            }&key=AIzaSyBMdf_nkVxcMqx7SXWyoGcs2v-QGxwlJJ8`
          )
        .then(res => res.json())
        .then (data => {
          
           
          this.setState({
              geojson : data.results[0].geometry.location,

              isGeo:true,

          });

          }).catch(err => console.log(err));
      
  }



      toSetSwitchvalue(){

        this.setState({

          isLow:false
        })

      }

  
 logout() {
        fire.auth().signOut();
    }
  
    render() {
      



    return(
      <div>
         




        
        {this.state.alert && <div className={`alert alert-${this.state.alertData.type}`} role='alert'>
          <div className='container'>
            {this.state.alertData.message}
          </div>
        </div>}
        <div className='container' style={{ padding: `40px 0px`}}>
          <div className='row'>
            <div className='col-sm-4'>
            </div>
            <div className='col-sm-4'>
                
             
              <form onSubmit={this.sendMessage.bind(this)} ref='contactForm'>
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <input type='text' className='form-control' id='name' placeholder='Enter your name' ref={name => this.inputName = name} />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Email</label>
                  <input type='email' className='form-control' id='email' placeholder='......@......' ref={email => this.inputEmail = email} />
                </div>
                



                <div className='form-group'>
                    <label htmlFor='exampleInputAddress'>Address</label>

                    <AutoComplete onAutoComplete = {this.handleData} />
               
                    </div>

                <div className='form-group'>
                    <label htmlFor='exampleInputSwitch'> Toggle Severity &nbsp;</label> 
                    <br />
                    <BootstrapSwitchButton
                        className='form-control'
                        checked={false}
                        onlabel='High'
                        onstyle='danger'
                        offlabel='Low'
                        offstyle='secondary'
                        width={100}
                        height={30}
                        size="xs"
                        onChange={this.toSetSwitchvalue}
                        
                    />
                </div>
                
                
                <div className='form-group'>
                  <label htmlFor='phone'>Phone</label>
                  <input type='number' className='form-control' id='phone' placeholder='Enter with country code' ref={phone => this.inputPhone = phone} />
                </div>
                <div className='form-group'>
                  <label htmlFor='message'>Message</label>
                  <input type='text' className='form-control' placeholder='Give us some additional notes' id='message' rows='3' ref={message => this.textAreaMessage = message}></input>
                </div>
                <button type='submit' className='btn btn-info' style={{ size: '20px'}}>Send</button>
                 

                <input type='hidden' value={this.state.geojson.lat} className='form-control' id='lat'  ref={lat => this.lat = lat} />
                <input type='hidden' value={this.state.geojson.lng} className='form-control' id='lng'  ref={lng => this.lng = lng} />
              </form>
              

            </div>
                
            
          </div>
        </div>
        
      </div>
    );
  }
}

export default Home;

/*<div className='form-group'>
                  <label htmlFor='city'>City</label>
                  <select className='form-control' id='city' ref={city => this.inputCity = city}>
                    <option value='México'>México</option>
                    <option value='Guadalajara'>Guadalajara</option>
                    <option value='Monterrey'>Monterrey</option>
                  </select>
                </div>*/



                /*//place_id = result.source.place_id;
       /*fetch('https://maps.googleapis.com/maps/api/place/details/json?input=bar&placeid=ChIJV7572jvzjIgRQp7QOMZjjdU&key=AIzaSyBMdf_nkVxcMqx7SXWyoGcs2v-QGxwlJJ8')
      .then(response => response.json())
      .then(geojson => {
        this.setState({geojson:geojson})
        
    })
      .catch(err => console.error(this.props.url, err.toString()))

      console.log(this.state.geojson) */
     // console.log(this.result);
      // console.log("address");
      // console.log(this.addressVal);*/



      /*<button onClick={this.setGeo()}> Click </button>
                <ul> <li>{this.state.geojson.lat}</li>
                    <li>{this.state.geojson.lng}</li>
                    </ul>
*/

/*<div className = 'form-group'>
                    <label htmlFor='exampleInputAddress'>Address</label>
                    <AutoComplete onAutoComplete = {this.handleData}/>
                </div>*/


                /*<Router>

                      <Nav fill variant="tabs" defaultActiveKey="/Home">
        <Nav.Item>
          <Nav.Link className='navitem'>Report an issue</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href ="/UserCheckMap" className='navitem'>Check clean water areas around you</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className='navitem' onClick={this.logout}>Logout</Nav.Link>
        </Nav.Item>
        
      </Nav>
      
      
      <Route path ="/UserCheckMap" exact strict component={UserCheckMap} />
      </Router>*/