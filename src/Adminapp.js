import React, { Component } from 'react';
import './App.css';
import fire from './Fire';
import Home from './Home';
import Adminlogin from './Adminlogin';
import Admin from './Admin';

class Adminapp extends Component {
  constructor() {
    super();
    this.state = ({
      admin: null,
    });
  this.authListener = this.authListener.bind(this);
  }

componentDidMount() {
    this.authListener();
  }

authListener() {
    fire.auth().onAuthStateChanged((admin) => {
      console.log(admin);
      if(admin){
        this.setState({ admin });
        localStorage.setItem('admin', admin.uid);
      } else {
        this.setState({ admin: null });
        localStorage.removeItem('admin');
      }
    });
  }
  

  render() {
    return (
      <div className="Adminapp">
        {this.state.admin ? (
          <Admin />
        ) :

          (
            <Adminlogin />
          )}

      </div>
    );
  }
}

export default Adminapp;