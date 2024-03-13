import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faTemperatureLow,
  faTemperatureHigh,
  faGauge,
  faCloud,
  faDroplet, 
  faTemperatureThreeQuarters,
  faP
} from "@fortawesome/free-solid-svg-icons";
import TimeFormat from '../functions/TimeFormat';



const WeatherInfoComponent = ({ weatherData }) => {
  if (!weatherData) return null;
  const degreeSymbol ='\u00B0'
  return (
  // <div className="weather-div">
<div className="daily-main-div">
<div className="daily-bottom-div">
        <div className="daily-params">
          <div className="daily-side-by-side 2">
            <div className="daily-enlarged">
              <p style={{ textAlign: "left", fontSize: "50px" }}>
                {Math.floor(weatherData?.main?.temp)}°
              </p>
              <p style={{textAlign: "left"}}>{weatherData.weather[0].main}, {weatherData.weather[0].description}</p>
            </div>
            <h3 style={{ textAlign: "left", borderTop: "1px solid black" }}>
              <FontAwesomeIcon icon={faCloud} /> Clouds
            </h3>
            <p style={{ textAlign: "left" }}>
            {weatherData.clouds.all}%
            </p>
            <h3 style={{ textAlign: "left", borderTop: "1px solid black" }}>
              <FontAwesomeIcon icon={faWind} /> Wind
            </h3>
            <p style={{ textAlign: "left" }}>{weatherData?.wind?.speed} mph</p>

            <h3 style={{ textAlign: "left", borderTop: "1px solid black" }}>
              <FontAwesomeIcon icon={faDroplet} /> Humidity
            </h3>
            <p style={{ textAlign: "left" }}>{weatherData?.main?.humidity}%</p>           
          </div>

          <div className="daily-side-by-side 2">
              <img className="weather-icon-img"
             src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
             alt="corresponding weather icon" style={{height: "90px"}}
                      />
                  <h3 style={{ textAlign: "left", borderTop: "1px solid black", marginTop:"10px"}}><FontAwesomeIcon icon={faTemperatureHigh} color='red'/> Max </h3>
                  <p style={{ textAlign: "left" }}>
                    {Math.floor(weatherData.main.temp_max)}°
                  </p>
                  <h3 style={{ textAlign: "left", borderTop: "1px solid black" }}><FontAwesomeIcon icon={faTemperatureLow} color='blue' /> Min </h3>
                  <p style={{ textAlign: "left" }}>
                    {Math.floor(weatherData.main.temp_min)}°
                  </p>
                  <h3 style={{ textAlign: "left", borderTop: "1px solid black" }}>
              <FontAwesomeIcon icon={faGauge} /> Pressure
            </h3>
            <p style={{ textAlign: "left" }}>
              {(weatherData?.main?.pressure * 0.02953).toFixed(2)} inHg
            </p>         
            
          </div>
        </div>
        </div>
        <div className="bottom-div"></div>
  </div>

  );
};
export default WeatherInfoComponent;