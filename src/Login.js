import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './Fire';
import App from './App'
import Buttonpage from './Buttonpage'
import Adminapp from './Adminapp'


class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    
    this.verify = this.verify.bind(this);
    this.state = {
      email: '',
      password: '',
      


    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  verify(e){
    e.preventDefault();
     var data, email;
      // var email
     let formRef = fire.database().ref('form/Admin/').orderByKey();
      formRef.once('value', snapshot => {
      data = snapshot.val();
      //keys = Object.keys(data);
     email = Object.values(data)
     console.log(Object.values(data));
     this.login(email)
    })
  }



  login(email) {
    console.log(email)
    if(email!=this.state.email){
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    this.props.setHidden(true)
    }).catch((error) => {
        console.log(error);
      });
  }}

 
  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{
      var user = fire.auth().currentUser;
      var uid = user.uid;
      var ref = fire.database().ref('form').child('Users').child(uid)
      ref.set(this.state.email)
      console.log(u)
    })
    .catch((error) => {
        console.log(error);
      })
  }

  

  render() {
    return (

      
      <div className="container">
      <div className="row">
       <div className="col-md-4">
       </div>
       <div className = "col-md-4">
       
       <form>
<h5 className="subtitle"><strong> USER </strong></h5>
<br />
      <div class="form-group">  
       <label for="exampleInputEmail1">Email address</label>
       <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
      </div>
      <br />
       <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
      <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <br />
      <button type="submit" onClick={this.verify} class="btn btn-primary">Login</button>
      <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
 

 </form>
</div>
</div>
 </div>



    );
  }
}
export default Login;

/* <form>
<h4 className="subtitle"><strong> User </strong></h4>
      <div class="form-group">  
       <label for="exampleInputEmail1">Email address</label>
       <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
       <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
       <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <button type="submit" onClick={this.verify} class="btn btn-primary">Login</button>
      <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
 </form>*/