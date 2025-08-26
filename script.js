function getWeather() {
  const apiKey = 'cd463ea3809b6250fe83a35817a29744';
  const city = document.getElementById('city').value;

  if (!city) {
      alert('Please enter a city');
      return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
          displayWeather(data);
      })
      .catch(error => {
          console.error('Error fetching current weather data:', error);
          alert('Error fetching current weather data. Please try again.');
      });

  fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
        const dataList = data.list;
          displayHourlyForecast(dataList);
          checkForExtremeWeatherConditions(dataList);
          console.log(dataList);
      })
      .catch(error => {
          console.error('Error fetching hourly forecast data:', error);
          alert('Error fetching hourly forecast data. Please try again.');
      });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfoDiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastDiv = document.getElementById('hourly-forecast');

  // Clear previous content
  weatherInfoDiv.innerHTML = '';
  hourlyForecastDiv.innerHTML = '';
  tempDivInfo.innerHTML = '';

  if (data.cod === '404') {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

      const temperatureHTML = `
          <p>${temperature}°C</p>
      `;

      const weatherHtml = `
          <p>${cityName}</p>
          <p>${description}</p>
      `;

      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHtml;
      weatherIcon.src = iconUrl;
      weatherIcon.alt = description;

      showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast');

  const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

  next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const hourlyItemHtml = `
          <div class="hourly-item">
              <span>${hour}:00</span>
              <img src="${iconUrl}" alt="Hourly Weather Icon">
              <span>${temperature}°C</span>
          </div>
      `;

      hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function checkForExtremeWeatherConditions(dataList) {
  let rainTimes = []; // Array to store times of potential rain
  let extremeHeatTimes = []; // Array to store times of potential extremely hot weather
  let heavySnowTimes = []; // Array to store times of potential heavy snow

  dataList.forEach(item => {
      const weather = item.weather[0]; // Access the first weather condition
      const pop = item.pop; // Probability of precipitation
      const temp = item.main.temp; // Current temperature
      const dateTime = item.dt_txt; // Date and time of the forecast

      // Check if the weather condition indicates rain or pop > threshold
      if ((weather.id >= 500 && weather.id <= 531) || pop > 0.3) {
          rainTimes.push(dateTime); // Store the time of potential rain
      }
      // Check for extreme heat (e.g., temperature > 310K)
      if (temp > 310) {
        extremeHeatTimes.push(dateTime);
      }
      // Check for heavy snowfall (e.g., weather condition code for snow)
      if (weather.id >= 600 && weather.id <= 622) {
        heavySnowTimes.push(dateTime);
    }
  });

  // Notify the user if rain is detected
  if (rainTimes.length > 0) {
    showNotification(
        'Rain Alert!',
        `It could rain at these times:<br>${rainTimes.join('<br>')}<br>Make Sure You Carry An Umbrella`
    );
  } 

  // Notify the user if a potential extreme hot weather is detected
  if (extremeHeatTimes.length > 0) {
    showNotification(
      'Heat Alert!', 
      `Extreme heat expected at these times:<br>${extremeHeatTimes.join('<br>')}`);
  }

  //Notify the user if heavy snowfall is detected
  if (heavySnowTimes.length > 0) {
    showNotification('Snow Alert!', `Heavy snowfall expected at these times:<br>${heavySnowTimes.join('<br>')}`);
  }

  // Log if no extreme weather is detected
  if (extremeHeatTimes.length === 0 && heavySnowTimes.length === 0 && rainTimes.length === 0) {
    showNotification('Weather Update', 'No extreme weather conditions detected.');
}
}

function showNotification(title, message) {
  const container = document.getElementById('notification-container');

  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';

  // Set notification content
  notification.innerHTML = `
      <p class="title">${title}</p>
      <p class="times">${message}</p>
  `;

  // Append notification to container
  container.appendChild(notification);

  // Automatically remove notification after 5 seconds
  setTimeout(() => {
      container.removeChild(notification);
  }, 15000);
}


function showImage() {
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}