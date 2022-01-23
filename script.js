console.log("script is linked")


$(document).ready(function () {
  // to hold an array of past searched cities
  var userCities = [];
  const APIKey = "81381409bd600c18171a812ecc668dea";
  function renderButtons() {
    $("#searchHistory").empty();
    console.log("submit btn function working");

    // looping through the array of cities
    for (var i = 0; i < userCities.length; i++) {
      console.log("forloop working");
      // generating a button for every city searched
      var newCities = $("<br><buttons>");

      // adding class
      newCities.addClass("btn btn-info");
      console.log("class for new cities added");
      // adding a data-attribute with a value of the citie at index i
      newCities.attr("data-name", userCities[i]);
      console.log("attribute for new cities data name added");
      // providing the button's text with a value of the movie at index i
      newCities.text(userCities[i]);
      console.log("text for new cities added");


      // adding the button to the HTML
      $("#searchHistory").append(newCities);
      console.log("end of renderButton function");
    }
  }

  // This function handles events where one button is clicked
  $("#searchBtn").on("click", function (event) {
    // prevents the form from trying to sumbit itself.
    event.preventDefault();
    $("#fiveDays").empty();
    console.log("search button working");
    // grab text from search nbox
    var userCity = $("#userSearch").val().trim();
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + APIKey + "&units=imperial";
    console.log(apiURL)
    $.ajax({
      url: apiURL,
      method: "GET"
    }).then(function (response) {
      console.log("ajax works");
      console.log(response);
      $("#cityName").text(response.name);
      var date = moment().format("MM/DD/YYYY");
      console.log(date);
      $("#date").text(date);
      $("#image").html(`<img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
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
        console.log(response.value);
        $("#UVindex").text(response.value);
        console.log(response.dt);
      })
    });

    fiveDays(userCity);
    userCities.push(userCity);
    console.log(userCities);
    // call renderButtons
    renderButtons();
  })


  function fiveDays(userCity) {
    console.log("FIVEDAY FUNCTION WORKING")
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + APIKey + "&units=imperial";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
       
        console.log("*******ajax call in five days working********");
        for (var i = 0; i < response.list.length; i++) {
          if (response.list[i].dt_txt.includes("00:00:00")){
            console.log(response.list[i]);
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