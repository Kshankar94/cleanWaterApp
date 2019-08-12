import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route'

import Adminlogin from './Adminlogin'
import Adminapp from './Adminapp'

//import './TitlePage.css'
import './App.css'





class Buttonpage extends Component {
  
  constructor(props){
    super(props);
    this.state={
      isAdmin:false,
      isUser:true,
      buttontext: "Are you an admin?",
      buttonStatus:''
    }

    this.setClick = this.setClick.bind(this);
  }

  setClick(){
    if(this.state.buttontext === "Are you an admin?"){
      console.log("first pass")
      this.setState({
      isAdmin:true,
      isUser:false,
      buttontext:"Are you a user?",
      
    })

    }
    else if (this.state.buttontext === "Are you a user?"){
      this.setState({
      isAdmin:false,
      isUser:true,
      buttontext:"Are you an admin?"
    })

    }
    
    
    
    
    
  }
  
  


  render(){
    return(
      <div  className="container">

         
         {this.props.getValue(this.state.isAdmin)}
            

            
            <div className = "row">
            <div className="col-md-4">
            </div>
            <div className="col-md-4">
             <button type="button" class="btn btn-outline-info choicebtn" onClick={this.setClick}>{this.state.buttontext}</button>
             </div>
            </div>
            

        </div>        
    


                      
    
        
    
       );
     }







     

}

export default Buttonpage;

/*<button type ="button" className ="btn btn-outline-info" onClick={this.setClick} className={this.state.buttonStatus}>{this.state.buttontext}</button>*/