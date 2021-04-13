
const api = '281bf290f6703d2b8dcf8d5d242ef32f'

let weatherInfo = document.querySelector('.weather-info')
let weatherLocation = document.getElementById('weather-location')
let weatherSummary = document.querySelector('.weather-summary')
let input = document.getElementById('fname');
let city;
let searchBtn = document.querySelector('.search-btn')




function displayWeatherData(data){
  console.log(data)
  weatherInfo.innerHTML = `<h2 id="weather-temp" class="color">${Math.round(data.main.temp-273)}<sup>o</sup></h2>
  <div class="weather-forecast-info">
    <h3 id="weather-location" class="color">${data.name}</h3>
    <p id="weather-time" class="color">
      10:36 - Tuesday, 22 Oct 2019<br />What a sunny day !
    </p>
  </div>
`
  weatherSummary.innerHTML = `
      <h3 class="color">Weather details</h3>
      <div class="weather-summary-info">
      <h4>Cloudy</h4>
      <p class="color">${data.clouds.all} %</p>
    </div>

    <div class="weather-summary-info">
      <h4>Humidity</h4>
      <p class="color">${data.main.humidity}%</p>
    </div>

    <div class="weather-summary-info">
      <h4>Wind</h4>
      <p class="color">${data.wind.speed} miles/hr</p>
    </div>
  `

}

window.addEventListener('DOMContentLoaded', () => {
    
    let latitude;
    let longitude;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

            latitude = position.coords.latitude
            longitude = position.coords.longitude

            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}`)
            .then(res => res.json())
            .then(data => displayWeatherData(data))
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
})

fname.addEventListener('input' , function(e){
  city = e.target.value
})


searchBtn.addEventListener('click' , function(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`)
    .then(res => res.json())
    .then(data => displayWeatherData(data))

})


