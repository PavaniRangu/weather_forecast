function GetInfo() {
    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--" + newName.value + "--";

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=b586d0c187e2bd4b6a891f37fbcebfa6')
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < 5; i++) {
                document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
                document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
                document.getElementById("day" + (i + 1) + "hum").innerHTML = "Humidity: " + data.list[i].main.humidity + "%";
                document.getElementById("day" + (i + 1) + "wind").innerHTML = "Wind Speed: " + data.list[i].wind.speed + " m/s";
                document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
            }
            console.log(data);
        })
        .catch(err => alert("Something went wrong: " + err.message));
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "Delhi";
    GetInfo();
}

var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}

for (let i = 0; i < 5; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}
