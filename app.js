
  // Function to fetch weather data from OpenWeatherMap API
  async function fetchWeather(city, countryCode) {
    try {
      const apiKey = 'a0f39767b30053cdd02990eadc579768'; // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  // Function to update the UI with weather data
  function updateWeatherUI(weatherData) {
    const date = new Date();
    document.querySelector('.date-dayname').textContent = date.toLocaleDateString('en-US', { weekday: 'long' });
    document.querySelector('.date-day').textContent = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    document.querySelector('.location').textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    document.querySelector('.weather-icon').setAttribute('data-feather', getWeatherIcon(weatherData.weather[0].main.toLowerCase()));
    document.querySelector('.weather-temp').textContent = `${Math.round(weatherData.main.temp)}°C`;
    document.querySelector('.weather-desc').textContent = weatherData.weather[0].description;
    document.querySelector('.precipitation .value').textContent = `${weatherData.clouds.all} %`;
    document.querySelector('.humidity .value').textContent = `${weatherData.main.humidity} %`;
    document.querySelector('.wind .value').textContent = `${weatherData.wind.speed} km/h`;
    feather.replace(); // Refresh Feather icons
  }

  // Function to map weather description to corresponding icons
  function getWeatherIcon(weather) {
    switch (weather) {
      case 'thunderstorm':
        return 'cloud-lightning';
      case 'drizzle':
      case 'rain':
        return 'cloud-rain';
      case 'snow':
        return 'cloud-snow';
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'dust':
      case 'fog':
      case 'sand':
      case 'ash':
      case 'squall':
      case 'tornado':
        return 'cloud';
      case 'clear':
        return 'sun';
      case 'clouds':
        return 'cloud';
      default:
        return 'sun';
    }
  }

  // Event listener for the "Change location" button
  document.querySelector('.location-button').addEventListener('click', async () => {
    const newLocation = prompt('Enter a city and country code (e.g., Paris, FR):');
    if (newLocation) {
      const [city, countryCode] = newLocation.split(',').map(item => item.trim());
      const weatherData = await fetchWeather(city, countryCode);
      if (weatherData) {
        updateWeatherUI(weatherData);
      }
    }
  });

  // Initial weather update for default location (Paris, FR)
  window.addEventListener('DOMContentLoaded', async () => {
    const defaultWeatherData = await fetchWeather('Paris', 'FR');
    if (defaultWeatherData) {
      updateWeatherUI(defaultWeatherData);
    }
  });

