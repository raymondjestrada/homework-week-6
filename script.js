$(document).ready(function () {

  var userCities = [];
  const APIKey = "81381409bd600c18171a812ecc668dea";
  function renderButtons() {
    $("#searchHistory").empty();
    console.log("submit btn function working");


    for (var i = 0; i < userCities.length; i++) {
      console.log("forloop working");
      var newCities = $("<br><buttons>");


      newCities.addClass("btn btn-info");
      console.log("class for new cities added");
      newCities.attr("data-name", userCities[i]);
      console.log("attribute for new cities data name added");
      newCities.text(userCities[i]);
     

      $("#searchHistory").append(newCities);
    }
  }


  $("#searchBtn").on("click", function (event) {
   
    event.preventDefault();
    $("#fiveDays").empty();


  
    var userCity = $("#userSearch").val().trim();
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + APIKey + "&units=imperial";
    console.log(apiURL)
    $.ajax({
      url: apiURL,
      method: "GET"
    }).then(function (response) {
      $("#cityName").text(response.name);
      var date = moment().format("MM/DD/YYYY");
      console.log(date);
      $("#date").text(date);
      $("#temperature").text(response.main.temp + " \u00B0");
      $("#humidity").text(response.main.humidity+ "%");
      $("#windSpeed").text(response.wind.speed + " mph");
      console.log(response.coord.lat);
      console.log(response.coord.lon);


      var indexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon;
      console.log(indexURL);
      $.ajax({
        url: indexURL,
        method: "GET"
      }).then(function (response) {
        $("#UVindex").text(response.value);
      })
    });


    fiveDays(userCity);
    userCities.push(userCity);

    renderButtons();
  })


  function fiveDays(userCity) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
       

        for (var i = 0; i < response.list.length; i++) {
          if (response.list[i].dt_txt.includes("00:00:00")){
          let column = $("<div>");
          column.addClass("col-md-2 p-3");
          var date = moment(response.list[i].dt_txt).format("MM/DD/YYYY");
          column.html(date + "<br>" + response.list[i].main.temp + "\u00B0 " + "<br>" + response.list[i].main.humidity + "%");
          column.appendTo($("#fiveDays"));
          }
          
        }
      });
  }
})