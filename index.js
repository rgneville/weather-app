const submitButton = document.querySelector('#submit-search');
const searchBox = document.querySelector('#searchBox');
const errorBox = document.querySelector('#errorBox');
const cntnr = document.querySelector('#container');
const clearButton = document.querySelector('#clear-locations');

function checkForStoredLocations () {
    const localData = localStorage.getItem('savedLocations');
    return localData ? JSON.parse(localData) : [];
}
//checks for anything in LS, returns contents of LS or a blank array to start from

let locations = checkForStoredLocations();

function clearDisplay () {
    cntnr.innerHTML = '';
}

function clearLocations () {
    locations = [];
    clearDisplay();
    localStorage.setItem('savedLocations', JSON.stringify( [] ));
}

function addLocation () {
    let newLocation = searchBox.value;
    locations.push(newLocation);
    localStorage.setItem('savedLocations', JSON.stringify(locations));
}

async function createWeatherCards () {
    for (let i = 0; i < locations.length; i++) {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locations[i]}&appid=221fcdab1d58f471292073096b454d21&units=metric`, {mode: 'cors'})
        let weather = await response.json();
        try {
            buildCard(weather);
            searchBox.style.borderStyle = "none";
            errorBox.innerHTML = "";
        } catch (error) {
            console.log(`Something went wrong... ${error}`);
            errorBox.innerHTML = "Country not found, try again...";
            searchBox.style.borderStyle = "solid";
            searchBox.style.borderWidth = "2px";
            searchBox.style.borderColor = "red";
            locations.pop();
            return 404
        }
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

submitButton.addEventListener('click', () => {
    addLocation();
    clearDisplay();
    createWeatherCards();
});

clearButton.addEventListener('click', () => {
    clearLocations();
    searchBox.style.borderStyle = "none";
});

createWeatherCards(locations);