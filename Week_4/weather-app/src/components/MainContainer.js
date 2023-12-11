import React, { useState, useEffect } from "react";
import "../styles/MainContainer.css"; // Import the CSS file for MainContainer

import Card from './Card';

function MainContainer(props) {

  function formatDate(daysFromNow = 0) {
    let output = "";
    var date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    output += date.toLocaleString("en-US", { weekday: "long" }).toUpperCase();
    output += " " + date.getDate();
    return output;
  }

  /*
  STEP 1: IMPORTANT NOTICE!

  Before you start, ensure that both App.js and SideContainer.js are complete. The reason is MainContainer 
  is dependent on the city selected in SideContainer and managed in App.js. You need the data to flow from 
  App.js to MainContainer for the selected city before making an API call to fetch weather data.
  */
  
  /*
  STEP 2: Manage Weather Data with State.
  
  Just like how we managed city data in App.js, we need a mechanism to manage the weather data 
  for the selected city in this component. Use the 'useState' hook to create a state variable 
  (e.g., 'weather') and its corresponding setter function (e.g., 'setWeather'). The initial state can be 
  null or an empty object.
  */
  
  const [weather, setWeather] = useState(null);
  const [futureWeather, setFutureWeather] = useState(null);
  const [aqi, setAQI] = useState(null);
  
  /*
  STEP 3: Fetch Weather Data When City Changes.
  
  Whenever the selected city (passed as a prop) changes, you should make an API call to fetch the 
  new weather data. For this, use the 'useEffect' hook.

  The 'useEffect' hook lets you perform side effects (like fetching data) in functional components. 
  Set the dependency array of the 'useEffect' to watch for changes in the city prop. When it changes, 
  make the API call.

  After fetching the data, use the 'setWeather' function from the 'useState' hook to set the weather data 
  in your state.
  */
  const apiKey = props.apiKey;
  
  useEffect(() => {
    if (props.city) {
      // get current weather
      let apiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${props.city.lat}&lon=${props.city.lon}&units=imperial&appid=${apiKey}`
			fetch (apiCall)
			.then((response) => response.json())
			.then((data) => setWeather(data))
      
      // get future weather
      apiCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${props.city.lat}&lon=${props.city.lon}&units=imperial&appid=${apiKey}`
			fetch (apiCall)
			.then((response) => response.json())
			.then((data) => setFutureWeather(data))
      
      // get aqi
      apiCall = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${props.city.lat}&lon=${props.city.lon}&appid=${apiKey}`
			fetch (apiCall)
			.then((response) => response.json())
			.then((data) => setFutureWeather(data.list[0].main))
    }
  }, [props.city])
  
  return (
    <div id="main-container">
      <div id="weather-container">
        {/* 
        STEP 4: Display Weather Data.
        
        With the fetched weather data stored in state, use conditional rendering (perhaps the ternary operator) 
        to display it here. Make sure to check if the 'weather' state has data before trying to access its 
        properties to avoid runtime errors. 

        Break down the data object and figure out what you want to display (e.g., temperature, weather description).
        This is a good section to play around with React components! Create your own - a good example could be a WeatherCard
        component that takes in props, and displays data for each day of the week.
        */}

        {weather && (
          <div id="current-container">
            <h2 id="date"> {formatDate()} </h2>
				    <h1 id="city"> {props.city.fullName} </h1>
            <div id="current-weather">
              <div id="conditions">
                <h2 id="weather-code"> {weather.weather[0].description} </h2>
                <h2 id="current-temp"> {Math.round(weather.main.temp) + "°"} </h2>
                {aqi && (<h4 id="aqi"> {"AQI: " + aqi.list[0].main.aqi} </h4>)}
              </div>
              <img id="icon" src={require(`../icons/${weather.weather[0].icon}.svg`)} alt="weather-icon"></img>
				    </div>
          </div>
        )}
        
        {futureWeather && Array.isArray(futureWeather.list) && (
          <div id="future-container">
            <Card date={formatDate(1)} future={futureWeather.list[0]}></Card>
            <Card date={formatDate(2)} future={futureWeather.list[8]}></Card>
            <Card date={formatDate(3)} future={futureWeather.list[16]}></Card>
            <Card date={formatDate(4)} future={futureWeather.list[24]}></Card>
            <Card date={formatDate(5)} future={futureWeather.list[32]}></Card>
          </div>
        )}

      </div>
    </div>
  );
}


export default MainContainer;

