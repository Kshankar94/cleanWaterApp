import React, { Component } from 'react';

import ReactDOM from "react-dom";


class Test extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
            geojson:{},
            //geoLocation:{}
            isGeo:false,
            value: 5,
        };

        this.setGeo = this.setGeo.bind(this);
        this.data = {};
    }



   setGeo(value){
   	console.log("enter")
    fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=650+North+Ross+Street,+Auburn,+AL&key=AIzaSyBMdf_nkVxcMqx7SXWyoGcs2v-QGxwlJJ8`
          )
        .then(res => res.json())
        .then (data => {
          
           
          this.setState({
              geojson : data.results[0].geometry.location,

              isGeo:true,

          });

          }).catch(err => console.log(err));
        console.log("geoData");
        console.log(value);
        console.log(this.state.geojson);
        
         
          
        //return "empty";

  }

  

    render() {
       //var val = this.setGeo();
       //console.log(val);
    	
    	// console.log(this.state.geojson);
   	  //{this.setGeo()}
      // if(!this.state.isGeo){
      // 	return <div> Loading </div>;

      // }
      


      return (
         <div>	
         <button onClick={this.setGeo()}> Click </button>
            <ul>
            	
            	<li>{this.state.geojson.lat}</li>
            	<li> {this.state.geojson.lng} </li>
            </ul>
          </div>
      );
   
}
  



}

export default Test






