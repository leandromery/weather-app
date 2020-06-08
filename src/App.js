import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'

function App() {

  const[location, setLocation] = useState(false);
  const[weather, setWeather] = useState(false);
    

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      //console.log(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if (location == false) {
    return (
      <Fragment>
        <div className="container-app location">
        <span><img src="./assets/location-browser.svg"/></span>
          <h3>Habilite a Localização no browser </h3>
        </div>

      </Fragment>
    )
  } else if (weather == false) {
    return (
      <Fragment>
        <div className="container-app loading">
          <span><img src="./assets/loading.svg"/></span>
          <h3>Carregando o clima</h3>
        </div>
        
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <div className="container-app weather-info">
          <div className="location-map animate__animated animate__fadeInDown"><img src="./assets/location-map.svg"/> {weather.name}</div>
          <div className="main">
            <img className="animate__animated animate__fadeInUp" src={'./assets/icons/'+ weather['weather'][0]['icon'] +'.png'} alt={weather['weather'][0]['main']}/>
            <div className="main-info">
              <h1 className="animate__animated animate__fadeInUp">{weather.main.temp}°</h1>
              <p>{weather['weather'][0]['description']}</p>
            </div>
          </div>
        </div>
        <div className="other-info animate__animated animate__fadeIn">
          <div className="info-item">
          <span><img src="./assets/temperatura.svg"/></span>
            <div className="info-text">
              <h4>Temperatura</h4>
              <p>{weather.main.temp_min}° / {weather.main.temp_max}°</p>
            </div>
          </div>
          <div className="info-item">
            <span><img src="./assets/sensacao.svg"/></span>
            <div className="info-text">
              <h4>Sensação</h4>
              <p>{weather.main.feels_like}°</p>
            </div>
          </div>
          <div className="info-item">
          <span><img src="./assets/humidity.svg"/></span>
            <div className="info-text">
              <h4>Humidade</h4>
              <p>{weather.main.humidity}%</p>
            </div>
          </div>
          <div className="info-item">
          <span><img src="./assets/wind.svg"/></span>
            <div className="info-text">
              <h4>Vel. Vento</h4>
              <p>{weather.wind.speed} km/h</p>
            </div>
          </div>
          
        </div>
        
      </Fragment>
    )
  }
  
}

export default App;
