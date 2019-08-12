import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from './Fire';
import './Home.css';
import Route from 'react-router-dom/Route'
import { Router } from 'react-router-dom';
import Admin from './Admin'
import App from './App'

class Adminlogin extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.verify = this.verify.bind(this);
    
    this.state = {
      email: "",
      password: "",
      isAdmin:false,
      data:{},
      

    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


//onClick={() => this.toMap(i)}

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
    
    // console.log(email);
    
   // 9HzlFz92ULUc7YDcDNHHCW5d90j1
    console.log("email")
    console.log(email)
    console.log(email === this.state.email)
    if(email == this.state.email){
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
    console.log("finish")
  }
  else{
    console.log("restricted access")
  }
}


  
  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).then((u)=>{
      var admin = fire.auth().currentUser;
      var uid = admin.uid;
      var ref = fire.database().ref('form').child('Admin').child(uid)
      ref.set(this.state.email)
      console.log(u)
    })
    .catch((error) => {
        console.log(error);
      })
  }

    /*<Router>
                        <Link to ="/Admin"></Link>
                        <Route path ="/Admin" exact strict component={Admin} />
                    </Router> */

/* <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>*/



  render() {
    return (

       
       <div className="container">
      <div className="row">
       <div className="col-md-4">
       </div>
       <div className = "col-md-4">

          <form>
          <h5 className="subtitle"><strong> ADMIN </strong></h5>
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
         
          
          
      
        </form>
</div>
</div>
      </div>

      
    );
  }
}
export default Adminlogin;

/*<Router>
                    <Link to ="/Admin"></Link>
                    <Route path ="/Admin" exact strict component={Admin} />
                </Router>
*/


/*{this.state.user == true ? (
          <Admin />
        ) :
        
          (
            <Adminlogin />
          )}*/


/*<button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>*/