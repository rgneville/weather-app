const submitButton = document.querySelector('#submit-search');
let searchTerm = document.querySelector('#search-box').value;
const cntnr = document.querySelector('#container');

function createWeatherCard () {
    searchTerm = document.querySelector('#search-box').value;
    let weather = getWeather();
    weather.then(function(result) {
        buildCard(result);
    })
    weather.catch(function(error) {
        console.log(error);
        return 404
    })    
}

function buildCard (result) {
    const weatherJSON = result;

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('cardbox');  
    const nameContainer = document.createElement('div');
    nameContainer.classList.add('namebox');
    nameContainer.innerHTML = `${weatherJSON.name}, ${weatherJSON.sys.country}`;
    const tempContainer = document.createElement('div');
    let currentTemp = weatherJSON.main.temp.toFixed(1);
    tempContainer.innerHTML = `current temp: ${currentTemp}`;
    const feelsLikeContainer = document.createElement('div');
    let feelsLikeTemp = weatherJSON.main.feels_like.toFixed(1);
    feelsLikeContainer.innerHTML = `feels like: ${feelsLikeTemp}`;
    const humidity = document.createElement('div');
    humidity.innerHTML = `humidity: ${weatherJSON.main.humidity}%`
    tempContainer.innerHTML = `current temp: ${currentTemp}`;
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
            tempContainer.innerHTML = `current temp: ${currentTemp.toFixed(1)}`;
            feelsLikeContainer.innerHTML = `feels like: ${feelsLikeTemp.toFixed(1)}`;
        } else if (cToF.innerHTML === "°F") {
            currentTemp = (currentTemp - 32) * 5/9;
            feelsLikeTemp = (feelsLikeTemp - 32) * 5/9;
            cToF.innerHTML = "°C";
            tempContainer.innerHTML = `current temp: ${currentTemp.toFixed(1)}`;
            feelsLikeContainer.innerHTML = `feels like: ${feelsLikeTemp.toFixed(1)}`;
        }
    })

    cardContainer.appendChild(nameContainer);
    cardContainer.appendChild(tempContainer);
    cardContainer.appendChild(feelsLikeContainer);
    cardContainer.appendChild(humidity);
    cardContainer.appendChild(icon);
    cardContainer.appendChild(descContainer);
    cardContainer.appendChild(cToF);
    cntnr.appendChild(cardContainer);
}

async function getWeather () {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=221fcdab1d58f471292073096b454d21&units=metric`, {mode: 'cors'})
    const weatherData = await response.json();
    return weatherData;
}

submitButton.addEventListener('click', createWeatherCard);