/*import React,{ Component } from 'react';


class Checkmap extends Component{
  render(){

      return (
      	
        <div>
            <p>Button2</p>      
        </div>
      	
        );
  }
}

export default Checkmap
*/

/*
import React, {PropTypes} from "react"

import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"

import iconMarker from "./iconMarker.svg"
//import iconMarkerHover from "./assets/iconMarkerHover.svg"

import styles from "./index.css"

const MY_API_KEY = "AIzaSyBMdf_nkVxcMqx7SXWyoGcs2v-QGxwlJJ8" // fake

const Map = ({googleMaps}) => (
  // GoogleMap component has a 100% height style.
  // You have to set the DOM parent height.
  // So you can perfectly handle responsive with differents heights.
  <div className={styles.map}>
    <GoogleMap
      googleMaps={googleMaps}
      // You can add and remove coordinates on the fly.
      // The map will rerender new markers and remove the old ones.
      coordinates={[
        {
          title: "Toulouse",
          icon: iconMarker,
          position: {
            lat: 43.604363,
            lng: 1.443363,
          },
          onLoaded: (googleMaps, map, marker) => {
            // Set Marker animation
            marker.setAnimation(googleMaps.Animation.BOUNCE)

            // Define Marker InfoWindow
            const infoWindow = new googleMaps.InfoWindow({
              content: `
                <div>
                  <h3>Toulouse<h3>
                  <div>
                    Toulouse is the capital city of the southwestern
                    French department of Haute-Garonne,
                    as well as of the Occitanie region.
                  </div>
                </div>
              `,
            })

            // Open InfoWindow when Marker will be clicked
            googleMaps.event.addListener(marker, "click", () => {
              infoWindow.open(map, marker)
            })

            // Change icon when Marker will be hovered
            googleMaps.event.addListener(marker, "mouseover", () => {
              marker.setIcon(iconMarkerHover)
            }) 

            googleMaps.event.addListener(marker, "mouseout", () => {
              marker.setIcon(iconMarker)
            })

            // Open InfoWindow directly
            infoWindow.open(map, marker)
          },
        }
      ]}
      center={{lat: 43.604363, lng: 1.443363}}
      zoom={8}
      onLoaded={(googleMaps, map) => {
        map.setMapTypeId(googleMaps.MapTypeId.SATELLITE)
      }}
    />
  </div>
)

Map.propTypes = {
  googleMaps: PropTypes.object.isRequired,
}

export default GoogleMapLoader(Map, {
  libraries: ["places"],
  key: MY_API_KEY,
}) 
*/

import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import fire from './Fire';

const mapStyles = {
   map:{
	    position: 'absolute',
	    width: '80%',
	    height: '80%',
      margin: '20px 0px 0px 40px',
	}
	  
};



export class MapContainer extends Component {
	/*state = {
	    showingInfoWindow: false,  //Hides or the shows the infoWindow
	    activeMarker: {},          //Shows the active marker upon click
	    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  }; */

constructor(props) {
    super(props);
   this.state = {
      coordinates: [],
      showingInfoWindow: false,  //Hides or the shows the infoWindow
      activeMarker: {},          //Shows the active marker upon click
      selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
      
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  getData(data){
    var dataVal = data;
    
    var keys = Object.keys(dataVal);
  for(var i = 0; i< keys.length; i++){
    //console.log(dataVal[keys[i]]);
    const { latitude, longitude, address } = dataVal[keys[i]];
    const values = { latitude, longitude, address };
    this.setState({ coordinates: [values].concat(this.state.coordinates) });
  }
 
}


componentWillMount() {

    let formRef = fire.database().ref('form/map/').orderByKey();
     var keys;
     var data;
    formRef.once('value', snapshot => {
      data = snapshot.val();
      keys = Object.keys(snapshot.val());
      //console.log(keys.length);
      this.getData(data);
      // const { name, email, phone, message, address } = snapshot.val();
      // console.log("snap");
      // console.log(snapshot.val());
      // const data = { name, email, phone, message, address };
      // this.setState({ form: [data].concat(this.state.form) });
    })
    
   
  }


/* <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
*/




    
        



  render() {
  	const style = Object.assign({}, mapStyles.map);
    return (
   <div className="container">
    <div style={style} ref ="map">
      <Map
        google={this.props.google}
        zoom={2}
        style={style}
        //initialCenter={{ lat: -1.2884, lng: 36.8233 }}
        >

{this.state.coordinates.map(coords =>

 	  <Marker
          onClick={this.onMarkerClick}
          position={{ lat: coords.latitude, lng: coords.longitude }}
          name={coords.address}
        />

      )}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}>
          <div>
            <p><strong>{this.state.selectedPlace.name}</strong></p>
          </div>

        </InfoWindow>

        </Map>
        </div>
        
</div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBMdf_nkVxcMqx7SXWyoGcs2v-QGxwlJJ8'
})(MapContainer);

