# WeatherNow 

A web application which dynamically displays the present weather at the user's favourite locations around the globe, from an array of locations which is persisted in local storage. Features a clickable unit display, which will convert the displayed temperature from Celsius to Fahrenheit and back. Handles unsuccessful API calls by displaying a message to the user.

## Lessons Learned

Was the first project I've ever made which consumes an external API - learned a lot about using async JavaScript (including Promises, async/await, fetch API and error handling).

First time working with JSON files, picked up extracting info from a JSON data structure and destructuring from this project.

## Potential Future Features

- Adding a small feature to each container which changes colour based on the temperature at the given location

- Research so far indicates that in a front end only vanilla JS application there's no way to hide an API key - when more comfortable with node, come back and refactor to include an environment variable to keep the key off GitHub. Could do this with React, but that would involve refactoring the whole project and I wanted to keep one vanilla JS project in my portfolio!

## Deployment

Deployed with [github pages](https://pages.github.com/).

## Get started

No dependencies - to run locally, open the project directory with VSCode. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) (if you haven't already) and click "Go Live" in the blue bar at the bottom of the screen. This will open a live development server in your browser that updates in response to code changes.