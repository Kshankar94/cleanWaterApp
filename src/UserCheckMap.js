import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import fire from './Fire';

const mapStyles = {
   map:{
	    position: 'absolute',
	    width: '75%',
	    height: '75%'
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
            <h2>{this.state.selectedPlace.name}</h2>
          </div>

        </InfoWindow>

        </Map>
        
    </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBMdf_nkVxcMqx7SXWyoGcs2v-QGxwlJJ8'
})(MapContainer);

