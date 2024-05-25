import { useState, useRef } from "react";
import Forecast from "./Forecast";

function App() {
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [container, setContainer] = useState(false);

  const cityInputRef = useRef();

  async function handleClick() {
    const city = cityInputRef.current.value;

    const data = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=7bc1973f43994deb876132724233103&q=${city}`
    );
    const data1 = await data.json();

    if (data1.error) {
      alert("Error! Please check your entered City.");
    } else {
      setWeather([data1]);
      setContainer(true);
      const data2 = await fetch(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=9fe1277b20b143bda522ed1a3da6ffe6`
      );
      const data3 = await data2.json();

      const data4 = [data3.data[1], data3.data[2], data3.data[3]];

      setForecast(data4);
    }
  }
  return (
    <div>
      <div className="control">
        <input
          type="text"
          placeholder="Enter City"
          ref={cityInputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <button onClick={handleClick}>Get Weather</button>
      </div>
      {container && (
        <>
          <div className="container">
            {weather.map((weath, index) => (
              <ul key={index} className="weather">
                <div>
                  <li className="name">{weath.location.name}</li>
                  <div className="location">
                    <li>{weath.location.region}</li>
                    <li>{weath.location.country}</li>
                  </div>
                  <li className="lightrain">{weath.current.condition.text}</li>
                </div>
                <div className="data">
                  <li>{Math.round(weath.current.temp_c)}°C</li>
                  <li className="icon">
                    <img src={weath.current.condition.icon} alt="symbol"></img>
                  </li>
                  <li className="feel">
                    Feels Like:{Math.round(weath.current.feelslike_c)}°C
                  </li>
                </div>
                <div>Last Update:{weath.current.last_updated}</div>
              </ul>
            ))}
          </div>
          <center>
            <h1>Forecast for the Next 3 Days</h1>
          </center>
          <div className="forecast">
            {forecast.map((fore, index) => (
              <Forecast
                date={fore.datetime}
                img={fore.weather.icon}
                description={fore.weather.description}
                high={fore.high_temp}
                low={fore.low_temp}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
