# Weather Forecast Website Project Report

## 1. Introduction
The **Weather Forecast Website** is a premium, dynamic weather dashboard application built with the MERN stack (React, Node.js/Express). It features a sophisticated **glassmorphism-based dashboard interface** that provides a comprehensive view of current weather, detailed atmospheric highlights, and future forecasts. The application is designed to be visually immersive, with backgrounds and animations that adapt in real-time to the weather conditions.

## 2. Key Features
*   **Professional Dashboard Layout**: A split-screen design that organizes information into a "Current Overview" and a "Detailed Metrics" section for better readability.
*   **Real-Time Weather Data**: Fetches accurate, up-to-date weather data using the **OpenWeatherMap API**.
*   **Smart Weather Tips**: An intelligent feature that provides lifestyle advice based on the weather (e.g., *"Don't forget your umbrella!"* or *"Great day for a swim!"*).
*   **Today's Highlights**: A dedicated grid section displaying critical weather metrics:
    *   **Humidity** with status indicators (e.g., "High").
    *   **Wind Speed & Direction**.
    *   **Visibility** in kilometers.
    *   **Air Pressure**.
*   **24-Hour Hourly Forecast**: A horizontal scrollable list showing the weather trend for the next 24 hours.
*   **5-Day Outlook**: A comprehensive 5-day forecast list to plan the week ahead.
*   **Dynamic Backgrounds & Gradients**: The application's background gradient changes dynamically based on the weather condition (e.g., Sunny Gold, Deep Blue Rain, Dark Storm).
*   **Immersive Weather Effects**:
    *   **Rain**: Animated falling rain droplets.
    *   **Snow**: Gentle falling snow animation.
    *   **Thunderstorm**: Flashing lightning effects combined with rain.
    *   **Clouds**: Drifting cloud animations.
*   **Glassmorphism Design**: Utilizes semi-transparent cards with `backdrop-filter: blur()` effects for a modern, sleek aesthetic.

## 3. Technology Stack
The project is built using the following technologies:

### Frontend
*   **React.js**: A JavaScript library for building user interfaces.
*   **CSS3**: Advanced styling with **CSS Grid** and **Flexbox** for the dashboard layout, plus custom `@keyframes` for weather animations.
*   **Axios**: For making HTTP requests to the backend.

### Backend
*   **Node.js**: JavaScript runtime environment.
*   **Express.js**: Web application framework for Node.js to handle API requests.
*   **Dotenv**: For managing environment variables (API keys).
*   **Cors**: To handle Cross-Origin Resource Sharing.

### External APIs
*   **OpenWeatherMap API**: Provides weather data, forecast information, and icons.

## 4. Project Structure
The project follows a clean separation of concerns between the client (frontend) and server (backend).

```
Task 3 - Weather Forecast Website/
├── client/                 # React Frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── App.js          # Main dashboard component with logic
│   │   ├── App.css         # Dashboard styling and animations
│   │   ├── setupProxy.js   # Proxy configuration for API requests
│   │   └── index.js        # Entry point for React
│   └── package.json        # Frontend dependencies
├── node_modules/           # Backend dependencies
├── .env                    # Environment variables (API Key)
├── server.js               # Express backend server
├── package.json            # Backend dependencies and scripts
└── README.md               # Project documentation
```

## 5. Installation & Setup Guide
Follow these steps to set up and run the project locally.

### Prerequisites
*   **Node.js** (v14 or higher)
*   **npm** (Node Package Manager)

### Step-by-Step Commands

**1. Navigate to the Project Directory**
Open your terminal and move to the project folder:
```bash
cd "Task 3 - Weather Forecast Website"
```

**2. Install Backend Dependencies**
Install the necessary packages for the server:
```bash
npm install
```

**3. Install Frontend Dependencies**
Navigate to the client folder and install React dependencies:
```bash
cd client
npm install
cd ..
```

**4. Run the Application**
Start both the backend server and frontend client simultaneously:
```bash
npm run dev
```
*   The application will open in your browser at `http://localhost:3000`.
*   The backend server runs on `http://localhost:5001`.

## 6. Usage Guide
1.  **Search by City**: Enter a city name in the search bar and press Enter or click the Search icon.
2.  **Use My Location**: Click the "Location Pin" icon to automatically fetch weather for your current coordinates.
3.  **Check Highlights**: Review the "Today's Highlights" grid for detailed atmospheric data.
4.  **Plan Ahead**: Use the "Next 24 Hours" scroll to see immediate trends and the "5-Day Outlook" for long-term planning.
5.  **Read Smart Tips**: Check the "Tip" section in the main card for daily advice.

## 7. Code Highlights
*   **Dashboard Grid System**: The UI uses CSS Grid (`grid-template-columns: 1fr 2fr`) to create a responsive, two-column layout that adapts to different screen sizes.
*   **Helper Functions**: Modular functions like `getSmartTips()` and `getBackground()` encapsulate logic to keep the main component clean.
*   **Proxy Configuration**: A `setupProxy.js` file is used in the client to securely forward API requests to the backend, avoiding CORS issues during development.
*   **Modular CSS**: Weather animations are defined as separate CSS classes (`.rain`, `.snow`, `.thunderstorm`) and applied conditionally based on the API response.

## 8. Future Enhancements
*   **Dark Mode Toggle**: Add a manual switch for dark/light themes.
*   **Interactive Maps**: Integrate a weather map layer to visualize precipitation and clouds.
*   **Saved Locations**: Allow users to save their favorite cities for quick access.
