import debounce from "lodash.debounce";
import React, { Component } from "react";
import { Search, Grid, Header } from "semantic-ui-react";


const google = window.google;
const autocompleteService = new google.maps.places.AutocompleteService();
const name = "";
export default class AutoComplete extends Component {
  
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>{
    this.setState({ value: result.title, selectedPlace: result });
    // props.onData1changed(result.title);
    this.handleData(result);
  }

  handleSearchChange = (e, { value }) => {
    if (value.length === 0) {
      return this.resetComponent();
    }

    this.setState({ isLoading: true, value });
    autocompleteService.getPlacePredictions(
      { input: value },
      this.handleAutocompleteResult
    );
  };

  handleAutocompleteResult = (predictions, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      this.setState({
        isLoading: false,
        results: predictions.map(prediction => {
          return {
            key: prediction.id,
            title: prediction.structured_formatting.main_text,
            description: prediction.structured_formatting.secondary_text,
            source: prediction
          };
        })
      });
    }
  };

 handleData = (result) =>{
  this.props.onAutoComplete(result);
 }
  render() {
    const { isLoading, value, results, selectedPlace } = this.state;
    // const props = this.props;
    //console.log(selectedPlace);
     // this.handleData(selectedPlace);


    return (
      
      <Grid>

        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}

            {...this.props}
            
          />
        </Grid.Column>
        
         
      </Grid>


      

    );
  }
}
