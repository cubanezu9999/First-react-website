import { useState, useRef } from "react";
let array = [];

function App() {
  const [weather, setWeather] = useState([]);
  const cityInputRef = useRef();

  async function handleClick() {
    setWeather([]);
    const city = cityInputRef.current.value;
    array.push(city);
    let set = new Set(array);

    set.forEach((element) => {
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=7bc1973f43994deb876132724233103&q=${element}`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather((objects) => [...objects, data]);
        });
    });
    cityInputRef.current.value = "";
  }

  return (
    <>
      <div className="control">
        <input type="text" placeholder="Enter City" ref={cityInputRef} />
        <button onClick={handleClick}> Get Weather </button>
      </div>
      <div className="main">
        {weather.map((weath, index) => (
          <div className="container" key={index}>
            <ul className="weather">
              <div>
                <li className="name">{weath.location.name}</li>
                <div className="location">
                  <li>{weath.location.region}</li>
                  <li>{weath.location.country}</li>
                </div>
                <li className="lightrain">{weath.current.condition.text}</li>
              </div>
              <div className="data">
                <li>{weath.current.temp_c}°C</li>
                <li className="icon">
                  <img src={weath.current.condition.icon} alt="symbol"></img>
                </li>
                <li className="feel">
                  Feels Like:{weath.current.feelslike_c}°C
                </li>
              </div>
              <div>Last Update:{weath.current.last_updated}</div>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
