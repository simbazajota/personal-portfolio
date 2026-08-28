// WEATHER API

const weather = {
    apiKey: "e960a1c2edec148280ede019ca0e60b9",
    fetchWeather: function (city) {
        const weatherContainer = document.querySelector(".weather");
        if (weatherContainer) {
            weatherContainer.classList.add("loading");
            weatherContainer.setAttribute("aria-busy", "true");
        }
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        const weatherIcon = document.querySelector(".icon");
        weatherIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
        weatherIcon.alt = description;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        const weatherContainer = document.querySelector(".weather");
        weatherContainer.classList.remove("loading");
        weatherContainer.setAttribute("aria-busy", "false");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".weather-search-bar").value);
    },
};

export function initWeather() {
    document.querySelector(".weather-search button").addEventListener("click", function () {
        weather.search();
    });

    document
        .querySelector(".weather-search-bar")
        .addEventListener("keyup", function (event) {
            if (event.key == "Enter") {
                weather.search();
            }
        });

    weather.fetchWeather("London");
}
