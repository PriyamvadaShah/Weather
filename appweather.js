let weather = {
    apikey: "8250e2b8e6df06487a3ceb8a04473029",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apikey
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      if (data.cod == "200") {
        getWeather(data);
      }
      else if (data.cod == "400") {
        noInput(data);
      }
      else{
        cityNotFound(data);
      }
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search-button").addEventListener("click", function () {
    weather.search();
  });
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") weather.search();
    });
  weather.fetchWeather("Greater Noida");
  
  
  function getWeather(data){
    const { name } = data;
    const { description, icon } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".location-city").innerHTML = "Weather in " + name;
    document.querySelector(".icon").style.backgroundImage = "url(https://openweathermap.org/img/wn/" + icon + "@2x.png)";
    document.querySelector(".temperature-degree").innerHTML = temp + "°C";
    document.querySelector(".weather-description").innerHTML = description;
    document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind: " + speed + "Km/hr";
    document.querySelector(".weather ").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + description + "')";
    document.querySelector(".temperature-degree").style.position = "relative";
    document.querySelector(".temperature-degree").style.visibility = "visible";
    document.querySelector(".humidity").style.position = "relative";
    document.querySelector(".humidity").style.visibility = "visible";
    document.querySelector(".wind").style.position = "relative";
    document.querySelector(".wind").style.visibility = "visible";
  }
  
  function noInput(data){
    document.querySelector(".location-city").innerHTML = "Something went wrong!";
    document.querySelector(".temperature-degree").style.position = "absolute";
    document.querySelector(".temperature-degree").style.visibility = "hidden";
    document.querySelector(".weather-description").style.position = "absolute";
    document.querySelector(".weather-description").style.visibility = "hidden";
    document.querySelector(".humidity").style.position = "absolute";
    document.querySelector(".humidity").style.visibility = "hidden";
    document.querySelector(".wind").style.position = "absolute";
    document.querySelector(".wind").style.visibility = "hidden";
  }
  
  function cityNotFound(data){
    document.querySelector(".location-city").innerHTML = "City not found";
    document.querySelector(".temperature-degree").style.position = "absolute";
    document.querySelector(".temperature-degree").style.visibility = "hidden";
    document.querySelector(".humidity").style.position = "absolute";
    document.querySelector(".weather-description").style.position = "absolute";
    document.querySelector(".weather-description").style.visibility = "hidden";
    document.querySelector(".humidity").style.visibility = "hidden";
    document.querySelector(".wind").style.position = "absolute";
    document.querySelector(".wind").style.visibility = "hidden";
  }
