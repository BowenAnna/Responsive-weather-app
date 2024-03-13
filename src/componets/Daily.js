import "../App_Anna.css";
import "../App.css";
import WeatherIcon from "../functions/WeatherIcon";
import TimeFormat from "../functions/TimeFormat";
import BigWeatherIcon from "../functions/BigWeatherIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWind,
  faTemperatureLow,
  faTemperatureHigh,
  faGauge,
  faEye,
  faDroplet 
} from "@fortawesome/free-solid-svg-icons";

export default function Daily({ weatherData }) {
  return (
    <div className="daily-main-div">
      <div className="daily-top-div">
        <div className="daily-city-title">
          <h1>
            {weatherData?.name}, {weatherData?.sys?.country}
          </h1>
        </div>
        <div className="daily-params">
          <div className="daily-side-by-side half-one">
            <p id="daily-temp">{Math.floor(weatherData?.main?.temp)}°</p>
            <h3 style={{ margin: " 0 0 10px 0" }}>
              {" "}
              {weatherData?.weather?.[0].main}
            </h3>
            <h3>
              <FontAwesomeIcon icon={faTemperatureHigh} color="var(--max)" />{" "}
              {Math.floor(weatherData?.main?.temp_max)}°F /{" "}
              <FontAwesomeIcon icon={faTemperatureLow} color="var(--min)" />{" "}
              {Math.floor(weatherData?.main?.temp_min)}°F
            </h3>
          </div>
          <div
            className="daily-side-by-side half-two"
            style={{ justifyContent: "right" }}
          >
            <BigWeatherIcon weatherCondition={weatherData?.weather?.[0].main} />
          </div>
        </div>
      </div>
      <div className="daily-bottom-div">
        <h3 style={{ textAlign: "left", margin: "10px 0 0 20px" }}>
          {" "}
          Weather today in {weatherData?.name}, {weatherData?.sys?.country}
        </h3>
        <div className="daily-params">
          <div className="daily-side-by-side 2">
            <div className="daily-enlarged">
              <p style={{ textAlign: "left" }}>Feels like</p>
              <p style={{ textAlign: "left", fontSize: "50px" }}>
                {Math.floor(weatherData?.main?.feels_like)}°
              </p>
            </div>
            <h3 style={{ textAlign: "left", borderTop: "1px solid black" }}>
              <FontAwesomeIcon icon={faDroplet} /> Humidity
            </h3>
            <p style={{ textAlign: "left" }}>{weatherData?.main?.humidity}%</p>
            <h3 style={{ textAlign: "left", borderTop: "1px solid black" }}>
              <FontAwesomeIcon icon={faGauge} /> Pressure
            </h3>
            <p style={{ textAlign: "left" }}>
              {(weatherData?.main?.pressure * 0.02953).toFixed(2)} inHg
            </p>
          </div>

          <div className="daily-side-by-side 2">
            <div className="daily-enlarged">
              <div style={{ display: "flex" }}>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/weather-from-cloud-flat/64/cloud-element-weather-sunrise-sun-up-rise-512.png"
                  alt="sun-rise-png"
                  style={{ width: "35px", margin: "20px 10px 0  0" }}
                />
                <div style={{ display: "block" }}>
                  <h3>Sunrise</h3>
                  <p>
                    <TimeFormat timestamp={weatherData?.sys?.sunrise} />
                  </p>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/weather-from-cloud-flat/64/cloud-element-weather-sunset-sun-down-set-512.png"
                  alt="sun-rise-png"
                  style={{ width: "35px", margin: "20px 10px 0  0" }}
                />
                <div style={{ display: "block" }}>
                  <h3>Sunset</h3>
                  <p>
                    <TimeFormat timestamp={weatherData?.sys?.sunset} />
                  </p>
                </div>
              </div>
            </div>
            <h3 style={{ textAlign: "left", borderTop: "1px solid black" }}>
              <FontAwesomeIcon icon={faWind} /> Wind
            </h3>
            <p style={{ textAlign: "left" }}>{weatherData?.wind?.speed} mph</p>
            <h3 style={{ textAlign: "left", borderTop: "1px solid black" }}>
              <FontAwesomeIcon icon={faEye} /> Visibility
            </h3>
            <p style={{ textAlign: "left" }}>
              {Math.floor(weatherData?.visibility * 0.00062).toFixed(2)} mi
            </p>
          </div>
        </div>
      </div>
      <div className="bottom-div"></div>
    </div>
  );
}
