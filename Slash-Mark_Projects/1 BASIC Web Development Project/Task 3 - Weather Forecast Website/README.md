# Weather Forecast Website

A dynamic weather forecast application built with React and Node.js/Express. It features real-time weather data, dynamic background effects based on weather conditions (rain, snow, clouds, thunderstorm), and interactive hover effects.

## Features

- **Real-time Forecast**: 5-day weather forecast using OpenWeatherMap API.
- **Dynamic Backgrounds**: The background changes based on the current weather (Clear, Cloudy, Rain, Snow, Thunderstorm, Mist).
- **Weather Effects**: Animated rain, snow, lightning, and moving clouds.
- **Interactive UI**: Hover over any forecast card to preview the weather atmosphere for that specific day.
- **Glassmorphism Design**: Modern, semi-transparent UI.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)

## Installation

1.  **Navigate to the project directory:**
    Open your terminal or IDE (VS Code, Cursor, etc.) and navigate to the `Task 3 - Weather Forecast Website` folder.

2.  **Install Server Dependencies:**
    ```bash
    npm install
    ```

3.  **Install Client Dependencies:**
    ```bash
    cd client
    npm install
    cd ..
    ```

## Running the Application

You can run the application using a single command or by running the server and client separately.

### Option 1: Run Both (Recommended)

From the root `Task 3 - Weather Forecast Website` directory:

```bash
npm run dev
```

*Note: If you encounter a "Invalid Host Header" error, see the Troubleshooting section.*

### Option 2: Run Separately

If you prefer to run them in separate terminals:

**Terminal 1 (Server):**
```bash
npm start
```
*Server runs on port 5001.*

**Terminal 2 (Client):**
```bash
cd client
npm start
```
*Client runs on port 3000.*

## Troubleshooting

### "Invalid Host Header" or Network Error
If you see an error related to the host header when running the client, you need to disable the host check.

**Windows (PowerShell):**
```powershell
$env:DANGEROUSLY_DISABLE_HOST_CHECK="true"; npm run client
```

**Mac/Linux/Git Bash:**
```bash
DANGEROUSLY_DISABLE_HOST_CHECK=true npm run client
```

### Port Conflicts
The server is configured to run on port **5001** to avoid conflicts with common services on port 5000.
- Server: `http://localhost:5001`
- Client: `http://localhost:3000`

If port 3000 is taken, React will ask to run on another port (e.g., 3001). This is fine, but ensure the proxy in `client/package.json` matches the server port (5001).

## Project Structure

- `server.js`: Express backend that fetches data from OpenWeatherMap.
- `client/`: React frontend application.
  - `src/App.js`: Main component with logic for weather fetching and effects.
  - `src/App.css`: Styles and animations for weather effects.
