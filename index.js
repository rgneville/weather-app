const submitButton = document.querySelector('#submit-search');
let searchTerm = document.querySelector('#search-box').value;
const cntnr = document.querySelector('#container');

function createWeatherCard () {
    searchTerm = document.querySelector('#search-box').value;
    let weather = getWeather();
    weather.then(function(result) {
        const weatherJSON = result;

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('cardbox');
        const nameContainer = document.createElement('div');
        nameContainer.innerHTML = weatherJSON.name;
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = weatherJSON.main.temp;
        const feelsLikeContainer = document.createElement('div');
        feelsLikeContainer.innerHTML = weatherJSON.main.feels_like;
        const descContainer = document.createElement('div');
        descContainer.innerHTML = weatherJSON.weather[0].description;
        const icon = document.createElement('img');
        icon.style.display = "none";
        iconCode = weatherJSON.weather[0].icon;
        icon.src = `http://openweathermap.org/img/wn/${iconCode}.png`;
        console.log(icon.src);
        icon.addEventListener('onload', () => {
            icon.style.display = "block";
        })

        cardContainer.appendChild(nameContainer);
        cardContainer.appendChild(tempContainer);
        cardContainer.appendChild(feelsLikeContainer);
        cardContainer.appendChild(descContainer);
        cardContainer.appendChild(icon);
        cntnr.appendChild(cardContainer);
    })
    weather.catch(function(error) {
        console.log(error);
        return 404
    })    
}

async function getWeather () {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=221fcdab1d58f471292073096b454d21&units=metric`, {mode: 'cors'})
    const weatherData = await response.json();
    return weatherData;
}

submitButton.addEventListener('click', createWeatherCard);