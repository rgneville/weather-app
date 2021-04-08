const submitButton = document.querySelector('#submit-search');
const errorBox = document.querySelector('#errorBox');
const cntnr = document.querySelector('#container');
const locations = [
    "Thornbury, GB",
    "Brasilia"
];

function clearDisplay () {
    cntnr.innerHTML = '';
}

function addLocation () {
    let newLocation = document.querySelector('#search-box').value;
    locations.push(newLocation);
}

function createWeatherCards () {
    for (let i = 0; i < locations.length; i++) {
        let weather = getWeather(locations[i]);
        weather.then(function(result) {
            buildCard(result);
        })
        weather.catch(function(error) {
            console.log(error);
            return 404
        })
    }    
}

function buildCard (result) {
    const weatherJSON = result;

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('cardbox');  
    const leftContainer = document.createElement('div');
    leftContainer.classList.add('leftContainer');
    
    const rightContainer = document.createElement('div');
    rightContainer.classList.add('rightContainer');

    const city = document.createElement('div');
    city.classList.add('city');
    city.innerHTML = `<h2>${weatherJSON.name}, ${weatherJSON.sys.country}</h2>`;

    const tempContainer = document.createElement('div');
    tempContainer.classList.add('tempContainer');

    const currentTempDiv = document.createElement('div');
    currentTempDiv.classList.add('currentTempDiv');
    let currentTemp = weatherJSON.main.temp.toFixed(1);
    currentTempDiv.innerHTML = `${currentTemp}`;

    const feelsLikeContainer = document.createElement('div');
    let feelsLikeTemp = weatherJSON.main.feels_like.toFixed(1);
    feelsLikeContainer.innerHTML = `feels like: ${feelsLikeTemp}°C`;

    const humidity = document.createElement('div');
    humidity.innerHTML = `humidity: ${weatherJSON.main.humidity}%`;
    const icon = document.createElement('img');
    iconCode = weatherJSON.weather[0].icon;
    icon.src = `http://openweathermap.org/img/wn/${iconCode}.png`
    const descContainer = document.createElement('div');
    descContainer.innerHTML = weatherJSON.weather[0].description;
    const cToF = document.createElement('div');
    cToF.id = 'c-to-f';
    cToF.innerHTML = "°C";
    cToF.addEventListener('click', () => {
        if (cToF.innerHTML === "°C") {
            currentTemp = currentTemp * (9/5) + 32;
            feelsLikeTemp = feelsLikeTemp * (9/5) + 32;
            cToF.innerHTML = "°F";
            currentTempDiv.innerHTML = `${currentTemp.toFixed(1)}`;
            feelsLikeContainer.innerHTML = `feels like: ${feelsLikeTemp.toFixed(1)}°F`;
        } else if (cToF.innerHTML === "°F") {
            currentTemp = (currentTemp - 32) * 5/9;
            feelsLikeTemp = (feelsLikeTemp - 32) * 5/9;
            cToF.innerHTML = "°C";
            currentTempDiv.innerHTML = `${currentTemp.toFixed(1)}`;
            feelsLikeContainer.innerHTML = `feels like: ${feelsLikeTemp.toFixed(1)}°C`;
        }
    })

    cardContainer.appendChild(leftContainer);
    cardContainer.appendChild(rightContainer);
    leftContainer.appendChild(city);
    leftContainer.appendChild(tempContainer);
    tempContainer.appendChild(currentTempDiv);
    tempContainer.appendChild(cToF);
    rightContainer.appendChild(feelsLikeContainer);
    rightContainer.appendChild(humidity);
    rightContainer.appendChild(icon);
    rightContainer.appendChild(descContainer);
    cntnr.appendChild(cardContainer);
}

async function getWeather (location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=221fcdab1d58f471292073096b454d21&units=metric`, {mode: 'cors'})
    const weatherData = await response.json();
    return weatherData;
}

submitButton.addEventListener('click', () => {
    addLocation();
    clearDisplay();
    createWeatherCards();
});

createWeatherCards(locations);