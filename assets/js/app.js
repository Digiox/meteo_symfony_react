import React from 'react';

import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import SearchComponent from "./SearchComponent"
import Header from "./Header"



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchedCity: "Toulouse",
      lat: "",
      long: "",
      redirect: false,
      redirectValue: ""
    }
  }
  componentDidMount() {
    


  }

  renderIcon = (icon) => {
    if (icon === "clear-day") {
      return "wi wi-day-sunny"
    } else if (icon === "clear-night") {
      return "wi wi-night-clear"
    }
    else if (icon === "rain") {
      return "wi wi-rain"
    }
    else if (icon === "snow") {
      return "wi wi-snow"
    }
    else if (icon === "sleet") {
      return "wi wi-sleet"
    }
    else if (icon === "wind") {
      return "wi wi-strong-wind"
    }
    else if (icon === "fog") {
      return "wi wi-fog"
    }
    else if (icon === "cloudy") {
      return "wi wi-cloudy"
    }
    else if (icon === "partly-cloudy-day") {
      return "wi wi-day-cloudy"
    }
    else if (icon === "partly-cloudy-night") {
      return "wi wi-night-alt-cloudy"
    }
    else if (icon === "hail") {
      return "wi wi-hail"
    }
    else if (icon === "thunderstorm") {
      return "wi wi-thunderstorm"
    }
    else {
      return "wi wi-na"
    }


  }
  render() {
    console.log(this.props.eventProps);

    return ( 
     
      
      <div className="mainContainer">
      {this.state.redirect ? window.location.href = this.state.redirectValue: console.log("no redirect yet")};
        <Header />
        <SearchComponent getSearchedCity={(city, lat, long) => { this.setState({ searchedCity: city, lat, long, redirect: true, redirectValue: '/?lat='+lat+'&lng='+long+'&city='+city });  }} />
        <div className="meteoSection">
          <div className="titleSection">
            <h1 id="titleCity">{this.props.eventCity}</h1>
            <i className={this.renderIcon(this.props.eventIcon)} />
          </div>
          <div className="dataSection">
            <div className="dataItem">
              <h2>Température: <span className="colorBlue">{this.props.eventTemp}°</span></h2>
              
            </div>

            <div className="dataItem">
              <h2 className="tempFormating">25°</h2>
              <h2>Vent: <span className="colorBlue">{this.props.eventWind} KM/H</span></h2>
            </div>
          </div>
        </div>

      </div>
     
    )
  }
}
const root = document.getElementById('root')

ReactDOM.render(<App {...(root.dataset)} />, root);