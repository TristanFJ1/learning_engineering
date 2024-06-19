document.getElementById('timezoneForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const timezone = document.getElementById('timezone').value;
    const [lat, lng] = timezone.split('&').map(param => param.split('=')[1]);
  
    const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&formatted=0`;
  
    // Using the standard fetch function to make the HTTP GET request
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const sunrise = new Date(data.results.sunrise);
        const sunset = new Date(data.results.sunset);
  
        // Schedule alarms using the browser's setTimeout function
        const now = new Date();
        const timeToSunrise = sunrise - now;
        const timeToSunset = sunset - now;
  
        if (timeToSunrise > 0) {
          setTimeout(() => puter.ui.alert('Wake up! The sun is rising!'), timeToSunrise);
        } else {
          puter.ui.alert('Sunrise has already occurred today.');
        }
  
        if (timeToSunset > 0) {
          setTimeout(() => puter.ui.alert('Time to sleep! The sun is setting!'), timeToSunset);
        } else {
          puter.ui.alert('Sunset has already occurred today.');
        }
  
        document.getElementById('alarmInfo').innerHTML = `
          <p>Sunrise Time: ${sunrise.toLocaleTimeString()}</p>
          <p>Sunset Time: ${sunset.toLocaleTimeString()}</p>
          <p>Alarm will go off at sunrise and bedtime reminder will be at sunset.</p>
        `;
      })
      .catch(error => {
        console.error('Error fetching sunrise and sunset times:', error);
        puter.ui.alert('Error retrieving sunrise and sunset times');
      });
  });
  