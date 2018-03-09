var statusTemp = {};
$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, function (data) {
                $("#city").html("<h2>" + data.name + ", " + data.sys.country + "</h2>");
                $("#temp").html("<h2>" + data.main.temp.toFixed(2) + "<a href='#' id='switch' onClick=converte()>°C</div></h2>");
                statusTemp.temp = data.main.temp;
                statusTemp.type = 0;
                $("#weather").html("<h2>" + capitalizeFirstLetter(data.weather[0].description) + "</h2>");
                switch (data.weather[0].main) {
                    case "Rain":
                        $("#icon").html('<div class="icon rainy">' +
                            '<div class="cloud"></div>' +
                            '<div class="rain"></div>' +
                            '</div>');
                        break;
                    case "Clear":
                        $("#icon").html('<div class="icon sunny">' +
                            '<div class="sun">' +
                            '<div class="rays"></div>' +
                            '</div>' +
                            '</div>');
                        break;
                    case "Clouds":
                        $("#icon").html('<div class="icon cloudy">' +
                            '<div class="cloud"></div>' +
                            '<div class="cloud"></div>' +
                            '</div>');
                        break;
                    case "Thunderstorm":
                        $("#icon").html('<div class="icon thunder-storm">' +
                            '<div class="cloud"></div>' +
                            '<div class="lightning">' +
                            '<div class="bolt"></div>' +
                            '<div class="bolt"></div>' +
                            '</div>' +
                            '</div>')
                        break;
                    default:
                        $("#icon").html(data.weather[0].main);
                        break;
                }
            })
        })
    }
});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function converte() {
    switch (statusTemp.type) {
        case 0:
            statusTemp.temp = (statusTemp.temp * 1.8) + 32;
            statusTemp.type = 1;
            $("#temp").html("<h2>" + statusTemp.temp.toFixed(2) + "<a href='#' id='switch' onClick=converte()>°F</div></h2>");
            break;
        case 1:
            statusTemp.temp = (statusTemp.temp - 32) / 1.8;
            statusTemp.type = 0;
            $("#temp").html("<h2>" + statusTemp.temp.toFixed(2) + "<a href='#' id='switch' onClick=converte()>°C</div></h2>");
            break;
        default:
            console.error(statusTemp);
    }
}



