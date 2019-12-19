      const openWeatherAppId = '127306dd59606786767c1f67958bda38'
      const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
      const openWeatherUrlF = 'https://api.openweathermap.org/data/2.5/forecast'

      const prepareData = function(units) {
        let cityName = $('#city-name').val()
        
        if (cityName && cityName != ''){
          cityName = cityName.trim()
          getData(openWeatherUrl, cityName, openWeatherAppId, units)
          getDataF(openWeatherUrlF, cityName, openWeatherAppId, units)
        }
        else {
          alert('Please enter the city name')
        }
      }

    $(document).ready(function(){

      $('.btn-metric').click(function() {
        $("#weather1").empty();
        $("#log").empty();
        prepareData('metric')
      })
      $('.btn-imperial').click(function() {
        $("#weather1").empty();
        $("#log").empty();
        prepareData('imperial')
      })

    })

    function getData (url, cityName, appId, units) {
      const request = $.ajax({
        url: url,
        dataType: "jsonp",
        data: {q: cityName, appid: appId, units: units},
        jsonpCallback: "fetchData",
        type: "GET"
      }).fail(function(error){
        console.error(error)
        alert('Error sending request')
      })
    }

    function getDataF (url, cityName, appId, units) {
      const request = $.ajax({
        url: url,
        dataType: "jsonp",
        data: {q: cityName, appid: appId, units: units},
        jsonpCallback: "fetchDataF",
        type: "GET"
      }).fail(function(error){
        console.error(error)
        alert('Error sending request')
      })
    }

    function fetchData (weather) {
      console.log(weather);
      
      let cityName = weather.name;
    let html = '';
      
      html += `<h3> Vrijeme sada u ${cityName} </h3>`;
      html += '<table><tr><td style="width: 70px;">Opis</td><td style="width: 80px;">Temperatura</td><td style="width: 70px;">Pritisak</td></tr>';
      html += '<tr>';
      html += '<td><img src="http://openweathermap.org/img/w/' + weather.weather[0].icon + '.png">';
      html += ''+ weather.weather[0].main + '</td>';
      html += '<td>'+ parseInt(weather.main.temp) + "°</td>";
      html += '<td>'+ weather.main.pressure + " hPa</td>";
      html += '</tr></table>';
      $('#weather1').html(html);
      }


    function fetchDataF (forecast) {
      console.log(forecast)
      let html = ''
      let cityName = forecast.city.name
      var table = '';
      table += '<h3> Prognoza za narednih 5 dana za ' + cityName + '</h3>';
      table += '<table><tr><td>Datum</td><td>Vrijeme</td><td>Temperatura</td><td>Opis</td><td>Pritisak</td><td>Vlažnost zraka</td><td>Brzina vjetra</td>'
    	for (var i = 6; i < forecast.list.length; i += 8) {
      	table += "<tr>";
      	table += "<td style='width: 80px;'>" + forecast.list[i].dt_txt.split(' ')[0];
      	table += "<td style='width: 80px;'><img src='http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png'></td>";
      	table += "<td style='width: 80px;'>" + parseInt(forecast.list[i].main.temp) + "</td>";
      	table += "<td style='width: 80px;'>" + forecast.list[i].weather[0].description + "</td>";
      	table += "<td style='width: 80px;'>" + forecast.list[i].main.pressure + "hPa</td>";
      	table += "<td style='width: 80px;'>" + forecast.list[i].main.humidity + "%</td>";
      	table += "<td style='width: 80px;'>" + forecast.list[i].wind.speed + "</td>";
 	     table += "</tr>";
      }
      table += '</table>';
      $('#log').html(table);
    }
    