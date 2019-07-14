import React, { Component } from 'react';
import fire from './Fire';
import AutoComplete from "./autocomplete";
import ReactDOM from "react-dom";
import './Home.css';


class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            form: [],
            alert:false,
            alertData:{},
            addrValue:'',
            
        };
        this.onData1Changed = this.onData1Changed.bind(this);
       
        this.handleData = this.handleData.bind(this);
        this.addressVal = '';
        
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
        var user = fire.auth().currentUser;
        var uid = user.uid;
        const params = {
          name: this.inputName.value,
          email: this.inputEmail.value,
          city: this.inputCity.value,
          phone: this.inputPhone.value,
          message: this.textAreaMessage.value,
          address: this.addressVal
        };
        if (params.name && params.email && params.phone && params.phone && params.message && params.address) {
          console.log(uid);
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

    logout() {
        fire.auth().signOut();
    }
   
    handleData(result) {
      // this.state.addrValue = addressVal;
       this.addressVal = result.title + result.description; 
       //console.log(this.addressVal);
      // console.log("address");
      // console.log(this.addressVal);
   }

   /*handleClick = () => {
    
        this.state.toAdmin = true;
      
  }*/
  
    render() {
      /*if (this.state.toAdmin === true) {
          return <Redirect to='/Admin' />
      }*/
    return(
      <div>
          {this.state.alert && <div className={`alert alert-${this.state.alertData.type}`} role='alert'>
          <div className='container'>
           
          </div>
        </div>}
        
        <div>
            <h3> Report an issue</h3>
            <button onClick={this.logout}>Logout</button>
        </div>
        <div className='container' style={{ padding: `40px 0px` }}>
          <div className='row'>
            <div className='col-sm-4'>
            </div>
            <div className='col-sm-4'>
                
              <h2>Contact Form</h2>
              <form onSubmit={this.sendMessage.bind(this)} ref='contactForm' >
                <div className='form-group'>
                  <label htmlFor='name'>Name</label>
                  <input type='text' className='form-control' id='name' placeholder='Name' ref={name => this.inputName = name} />
                </div>
                <div className='form-group'>
                  <label htmlFor='exampleInputEmail1'>Email</label>
                  <input type='email' className='form-control' id='email' placeholder='Email' ref={email => this.inputEmail = email} />
                </div>
                <div className = 'form-group'>
                    <label htmlFor='exampleInputAddress'>Address</label>
                    <AutoComplete onAutoComplete = {this.handleData}/>

              

                </div>
                <div className='form-group'>
                  <label htmlFor='city'>City</label>
                  <select className='form-control' id='city' ref={city => this.inputCity = city}>
                    <option value='México'>México</option>
                    <option value='Guadalajara'>Guadalajara</option>
                    <option value='Monterrey'>Monterrey</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label htmlFor='phone'>Phone</label>
                  <input type='number' className='form-control' id='phone' placeholder='+52 1' ref={phone => this.inputPhone = phone} />
                </div>
                <div className='form-group'>
                  <label htmlFor='message'>Message</label>
                  <textarea className='form-control' id='message' rows='3' ref={message => this.textAreaMessage = message}></textarea>
                </div>
                <button type='submit' className='btn btn-primary'>Send</button>
              </form>
              

            </div>
                
            
          </div>
        </div>
        <div className='alert alert-info fixed-bottom'>
          
        </div>
      </div>
    );
  }
}

export default Home;

