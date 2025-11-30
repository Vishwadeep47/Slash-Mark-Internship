import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [hoveredWeather, setHoveredWeather] = useState(null);

  const fetchByCity = async () => {
    if (!query) return;
    try {
      const res = await axios.get(`/api/weather?q=${query}`);
      const data = res.data;
      if (data.cod !== "200") {
        setError(data.message || 'City not found.');
        setForecast(null);
        return;
      }
      setForecast(data);
      setError('');
    } catch {
      setError('Failed to fetch weather data.');
      setForecast(null);
    }
  };

  const fetchByLocation = () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await axios.get(`/api/weather?lat=${latitude}&lon=${longitude}`);
        const data = res.data;
        if (data.cod !== "200") {
          setError(data.message || 'Location error.');
          setForecast(null);
          return;
        }
        setForecast(data);
        setError('');
      } catch {
        setError('Location weather unavailable.');
        setForecast(null);
      }
    }, () => {
      setError('Location permission denied.');
      setForecast(null);
    });
  };

  // Helper: Get background gradient
  const getBackground = (condition) => {
    switch (condition) {
      case 'Clear': return 'linear-gradient(to bottom right, #FFD700, #ff8c00)'; // Sunny Gold
      case 'Clouds': return 'linear-gradient(to bottom right, #bdc3c7, #2c3e50)'; // Grey
      case 'Rain':
      case 'Drizzle': return 'linear-gradient(to bottom right, #000046, #1cb5e0)'; // Deep Blue
      case 'Thunderstorm': return 'linear-gradient(to bottom right, #141E30, #243B55)'; // Dark Storm
      case 'Snow': return 'linear-gradient(to bottom right, #E0EAFC, #CFDEF3)'; // Ice White
      case 'Mist':
      case 'Fog': return 'linear-gradient(to bottom right, #3e5151, #decba4)'; // Misty
      default: return 'linear-gradient(to bottom right, #74ebd5, #ACB6E5)';
    }
  };

  // Helper: Get effect class
  const getEffectClass = (condition) => {
    switch (condition) {
      case 'Thunderstorm': return 'thunderstorm';
      case 'Rain':
      case 'Drizzle': return 'rain';
      case 'Snow': return 'snow';
      case 'Clouds': return 'clouds';
      default: return '';
    }
  };

  // Helper: Smart Tips
  const getSmartTips = (weatherMain, temp) => {
    if (weatherMain === 'Rain' || weatherMain === 'Drizzle' || weatherMain === 'Thunderstorm') return "Don't forget your umbrella! It's wet outside.";
    if (weatherMain === 'Snow') return "Bundle up! It's freezing and snowy.";
    if (weatherMain === 'Clear' && temp > 25) return "Great day for a swim or ice cream! Stay hydrated.";
    if (weatherMain === 'Clear' && temp < 15) return "Sunny but crisp. A light jacket is recommended.";
    if (weatherMain === 'Clouds') return "Perfect weather for a cozy coffee or a walk.";
    return "Enjoy your day!";
  };

  const weatherMain = hoveredWeather || forecast?.list?.[0]?.weather?.[0]?.main;
  const currentTemp = forecast?.list?.[0]?.main?.temp;
  const currentBackground = getBackground(weatherMain);
  const effectClass = getEffectClass(weatherMain);
  const tips = forecast ? getSmartTips(forecast.list[0].weather[0].main, forecast.list[0].main.temp) : '';

  return (
    <div className="app-wrapper" style={{ background: currentBackground }}>
      {effectClass && <div className={`weather-effect ${effectClass}`}></div>}

      <div className="main-container">
        <header className="app-header">
          <h1 className="logo">Weather Forecast</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search city..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && fetchByCity()}
            />
            <button onClick={fetchByCity}>🔍</button>
            <button onClick={fetchByLocation} className="loc-btn">📍</button>
          </div>
        </header>

        {error && <div className="error-msg">{error}</div>}

        {!forecast && !error && (
          <div className="welcome-screen">
            <h2>Welcome to SkyCast</h2>
            <p>Enter a city or use your location to get started.</p>
          </div>
        )}

        {forecast && (
          <div className="dashboard">
            {/* Left Column: Main Weather */}
            <div className="current-weather-section">
              <div className="main-card">
                <div className="location-badge">
                  {forecast.city.name}, {forecast.city.country}
                </div>
                <div className="temp-display">
                  {Math.round(forecast.list[0].main.temp)}°
                </div>
                <div className="condition-display">
                  {forecast.list[0].weather[0].main}
                </div>
                <div className="date-display">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
                <div className="smart-tip">
                  💡 <strong>Tip:</strong> {tips}
                </div>
              </div>
            </div>

            {/* Right Column: Details & Hourly */}
            <div className="details-section">

              {/* Highlights Grid */}
              <h3 className="section-title">Today's Highlights</h3>
              <div className="highlights-grid">
                <div className="highlight-card">
                  <span className="label">Humidity</span>
                  <span className="value">{forecast.list[0].main.humidity}%</span>
                  <span className="status">{forecast.list[0].main.humidity > 60 ? 'High' : 'Normal'}</span>
                </div>
                <div className="highlight-card">
                  <span className="label">Wind Speed</span>
                  <span className="value">{forecast.list[0].wind.speed} m/s</span>
                  <span className="status">Direction: {forecast.list[0].wind.deg}°</span>
                </div>
                <div className="highlight-card">
                  <span className="label">Pressure</span>
                  <span className="value">{forecast.list[0].main.pressure} hPa</span>
                </div>
                <div className="highlight-card">
                  <span className="label">Visibility</span>
                  <span className="value">{(forecast.list[0].visibility / 1000).toFixed(1)} km</span>
                </div>
              </div>

              {/* Hourly Forecast (Next 24h - approx first 8 items) */}
              <h3 className="section-title">Next 24 Hours</h3>
              <div className="hourly-scroll">
                {forecast.list.slice(0, 8).map((item, i) => (
                  <div key={i} className="hourly-card">
                    <p className="time">{new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt="icon"
                    />
                    <p className="temp">{Math.round(item.main.temp)}°</p>
                  </div>
                ))}
              </div>

              {/* 5-Day Forecast */}
              <h3 className="section-title">5-Day Outlook</h3>
              <div className="daily-list">
                {forecast.list.filter((_, i) => i % 8 === 0).map((item, i) => (
                  <div
                    key={item.dt}
                    className="daily-row"
                    onMouseEnter={() => setHoveredWeather(item.weather[0].main)}
                    onMouseLeave={() => setHoveredWeather(null)}
                  >
                    <span className="day-name">{new Date(item.dt_txt).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                    <div className="daily-icon-wrapper">
                      <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="icon" />
                      <span>{item.weather[0].main}</span>
                    </div>
                    <span className="daily-temp">{Math.round(item.main.temp)}° / {Math.round(item.main.temp_min)}°</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
