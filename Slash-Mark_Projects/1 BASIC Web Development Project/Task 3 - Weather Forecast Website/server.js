const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

// Free OpenWeather API key (backend only)
const apiKey = '319e6f26b87482674ff8fa904e097970';

app.get('/api/weather', async (req, res) => {
  const { lat, lon, q } = req.query;
  try {
    const url = lat && lon
      ? `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      : `https://api.openweathermap.org/data/2.5/forecast?q=${q}&units=metric&appid=${apiKey}`;
    const response = await axios.get(url);
    console.log('Weather API Response:', response.data);

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.message || 'Failed to fetch weather' });
  }
});

// Serve React build in production
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
);

const PORT = process.env.PORT_NUMBER || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
