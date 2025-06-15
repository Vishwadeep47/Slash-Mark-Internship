import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');

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

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>☀️ Weather Forecast</h1>

        <div style={styles.inputSection}>
          <input
            type="text"
            placeholder="Enter city"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={styles.input}
          />
          <button onClick={fetchByCity} style={styles.button}>Search</button>
          <button onClick={fetchByLocation} style={{ ...styles.button, backgroundColor: '#6c63ff' }}>
            Use My Location
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {forecast && forecast.city && forecast.list && (
          <div style={styles.forecast}>
            <h2 style={styles.subtitle}>
              5‑Day Forecast for {forecast.city.name}, {forecast.city.country}
            </h2>
            <div style={styles.cardContainer}>
              {forecast.list.filter((_, i) => i % 8 === 0).map(item => (
                <div key={item.dt} style={styles.card}>
                  <p style={styles.date}>{new Date(item.dt_txt).toLocaleDateString()}</p>
                  <img
                    src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt={item.weather[0].description}
                    style={styles.icon}
                  />
                  <p style={styles.temp}>{Math.round(item.main.temp)}°C</p>
                  <p style={styles.desc}>{item.weather[0].main}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: 'linear-gradient(to top right, #74ebd5, #ACB6E5)',
    minHeight: '100vh',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'Segoe UI, sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: 1200,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: '30px 40px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '2.8em',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: '1.4em',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center'
  },
  inputSection: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: 30,
  },
  input: {
    padding: '12px 14px',
    width: 240,
    fontSize: '1em',
    borderRadius: 6,
    border: '1px solid #ccc'
  },
  button: {
    padding: '12px 18px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    fontSize: '1em',
    cursor: 'pointer',
    borderRadius: 6,
    transition: 'background-color 0.2s ease-in-out'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontWeight: 500
  },
  forecast: {
    textAlign: 'center',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: 20
  },
  card: {
    background: '#ffffff',
    borderRadius: 12,
    padding: '20px 25px',
    width: 180,
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    textAlign: 'center'
  },
  date: {
    fontWeight: '600',
    fontSize: '1.1em',
    marginBottom: 10,
    color: '#555'
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 10
  },
  temp: {
    fontSize: '1.4em',
    fontWeight: 'bold',
    color: '#222'
  },
  desc: {
    color: '#555',
    fontSize: '1em',
    fontWeight: 500
  }
};

export default App;
