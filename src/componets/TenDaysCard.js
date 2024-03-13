import React, { useState } from "react";
import "../App_Mishelle.css";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faTemperatureHigh,
  faTemperatureLow,
  faWind,
  faGauge,
  faEye,
  faDroplet,
  faCaretUp,
  faCaretDown,
  faSun,
  faMoon,
  faCloudSunRain,
} from "@fortawesome/free-solid-svg-icons";

export default function TenDaysCard({ tenDaysData }) {
  const [isClicked, setIsClicked] = useState(false);
  console.log(tenDaysData);
  // Check if tenDaysData.list is defined and is an array
  // if (tenDaysData && tenDaysData.list && Array.isArray(tenDaysData.list)) {
  //   const tenDaysArray = tenDaysData.list;
  // Check if tenDaysData.city is defined
  if (tenDaysData && tenDaysData.city) {
    const tenDaysArray = tenDaysData.list;
    //coverts unix time to weekday, month day (my choice of render)
    function convertTimestampToWeekday(timestamp) {
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const date = new Date(timestamp * 1000); // Convert to milliseconds
      const dayOfWeek = daysOfWeek[date.getDay()];
      const month = months[date.getMonth()];
      const dayOfMonth = date.getDate();
      return `${dayOfWeek}, ${month} ${dayOfMonth}`;
    }
    function weekDays (timestamp){
      const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const date = new Date(timestamp * 1000); // Convert to milliseconds
      const dayOfWeek = daysOfWeek[date.getDay()];
      // const dayOfMonth = date.getDate();
      return `${dayOfWeek}`;

    }
    // converts unix time to 12 hrs PM/AM
    //convert unix time to 12 hours AM/PM for sunrise/sunset
    function convertTimestampTo12Hour(timestamp) {
      const date = new Date(timestamp * 1000);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
    }
    const windSpeedMetersPerSecond = 10.68;
    const windDirectionDegrees = 153;
    const windGustMetersPerSecond = 28.08;
    // Conversion functions
    const metersPerSecondToKilometersPerHour = (metersPerSecond) =>
      metersPerSecond * 3.6;
    const metersPerSecondToMilesPerHour = (metersPerSecond) =>
      metersPerSecond * 2.237;
    // Convert values
    const windSpeedKilometersPerHour = metersPerSecondToKilometersPerHour(
      windSpeedMetersPerSecond
    );
    const windSpeedMilesPerHour = metersPerSecondToMilesPerHour(
      windSpeedMetersPerSecond
    );
    // Function to get wind direction
    function getWindDirection(degrees) {
      const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
      const index = Math.round(degrees / 45) % 8;
      return directions[index];
    }
    function handleDetailClick() {
      setIsClicked(!isClicked);
    }

    return (
      <div className="main-body">
        <h2>
          10 Day forecast - {tenDaysData.city.name}, {tenDaysData.city.country}
        </h2>
        <div
          className={`TenDays-Card ${isClicked ? "clicked" : ""}`}
          onClick={handleDetailClick}
        >
          {/* mapping thru the dataset to get each date's weather */}
          {tenDaysArray.map((daily, index) => (
            <div key={index} className="days-blocks">
              {/* if the div is clicked, row disappears, replaced by details(bottom) */}
              {/* converts from unix date & displays: weekday, momth, date in the month */}
              <div className={`shown ${isClicked ? "hidden" : ""}`}>
                <h3>
                  {weekDays(daily.dt)}
                  {/* {convertTimestampToWeekday(daily.dt)}{" "}
                      {new Date(daily.dt * 1000).toLocaleDateString()} */}
                </h3>
                {/* displays max/min temp  */}
                <h3 style={{display: "flex", flexWrap:"wrap"}}>
                  <FontAwesomeIcon
                    icon={faTemperatureHigh}
                    color="var(--max)"
                  />
                  {Math.floor(daily.temp.max)}&deg;F/{" "}
                  <FontAwesomeIcon icon={faTemperatureLow} color="var(--min)" />
                  {Math.floor(daily.temp.min)}&deg;F
                </h3>

                <img
                  className="weather-icon-img"
                  src={`https://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`}
                  alt="corresponding weather icon"
                  style={{
                    width: "60px"
                  }}
                />

                <div className="two-elements">
                  <img
                    className="weather-raindrop-img"
                    src="https://www.transparentpng.com/thumb/raindrops/blue-raindrops-png-pictures-2.png"
                    alt="weather-raindrop-icon"
                  />
                  <h3>{Math.floor(daily.pop * 100)}%</h3>
                </div>
                <h3>
                  <FontAwesomeIcon icon={faWind} />{" "}
                   {Math.floor(daily.speed * 2.237)} mph{" "}
                  {/* <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ color: "var(--main)" }}
                  /> */}
                </h3>
              </div>

              {/*////////////////////////////////////////////////////////////*/}

              <div
                className={`notshown ${isClicked ? "AM-box" : "hidden AM-box"}`}
              >
                <h3 style={{ textAlign: "left", margin: "10px 0 0 20px" }}>
                  {" "}
                  {convertTimestampToWeekday(daily.dt)}
                </h3>

                <div className="daily-params">
                  <div className="daily-side-by-side 2">
                    <div className="daily-enlarged">
                      <p style={{ textAlign: "left" }}>Feels like</p>
                      <p style={{ textAlign: "left", fontSize: "50px" }}>
                        {Math.floor(daily.feels_like.day)}°
                      </p>
                    </div>

                    <h3
                      style={{
                        textAlign: "left",
                        borderTop: "1px solid black",
                      }}
                    >
                      <FontAwesomeIcon icon={faCloudSunRain} /> Conditions
                    </h3>
                    <p style={{ textAlign: "left" }}>
                      {daily.weather[0].main}, {daily.weather[0].description}
                    </p>
                    <h3
                      style={{
                        textAlign: "left",
                        borderTop: "1px solid black",
                      }}
                    >
                      <FontAwesomeIcon icon={faDroplet} /> Humidity
                    </h3>
                    <p style={{ textAlign: "left" }}>{daily.humidity}%</p>
                    <h3
                      style={{
                        textAlign: "left",
                        borderTop: "1px solid black",
                      }}
                    >
                    <FontAwesomeIcon icon={faWind} /> Wind</h3>
                    <p style={{ textAlign: "left" }}>
                  {getWindDirection(daily.deg)}{" "}
                  {Math.floor(daily.speed * 2.237)} mph{" "}</p>
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
                          <p>{convertTimestampTo12Hour(daily.sunrise)}</p>
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
                          <p>{convertTimestampTo12Hour(daily.sunset)}</p>
                        </div>
                      </div>
                    </div>
                    <h3
                      style={{
                        textAlign: "left",
                        borderTop: "1px solid black",
                      }}
                    >
                      <FontAwesomeIcon icon={faSun} /> Day
                    </h3>
                    <p style={{ textAlign: "left" }}>
                      {Math.floor(daily.temp.day)}&deg;F
                    </p>
                    <h3
                      style={{
                        textAlign: "left",
                        borderTop: "1px solid black",
                      }}
                    >
                      <FontAwesomeIcon icon={faMoon} /> Night
                    </h3>
                    <p style={{ textAlign: "left" }}>
                      {Math.floor(daily.temp.morn)}&deg;F
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bottom-div"></div>
      </div>
    );
  } else {
    // Handle the case where the expected data structure is not present
    console.error(
      "Invalid or missing data structure in API response:",
      tenDaysData
    );
    return <div>Error loading data</div>;
  }
}
