
/*
här kallar vi på sökrutan via dens ID
*/
let searchBox = document.getElementById("search");

/* 
här skapas en URL genom en funktion. Här försöker då vi skapa en URL via open weather och en api nyckel
*/
function getWeatherUrl(cityName) {
  let weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather");

  weatherUrl.searchParams.set("q", cityName);
  weatherUrl.searchParams.set("appid", "bfcd6b0cb6794e54cb615620f418b9be");
  weatherUrl.searchParams.set("mode", "json");
  weatherUrl.searchParams.set("units", "metric");
  weatherUrl.searchParams.set("lang", "se");

  return weatherUrl;
}
/*
funtionen här hämtar ut data från den nyskapta URLen vi har gjort ovan
*/
function getWeatherInfo() {
  let city = searchBox.value;
  let url = getWeatherUrl(city);

  /*
  här görs en HTTP request med urlen från ovan
  */
  let weatherRequest = new XMLHttpRequest();
  weatherRequest.open("GET", url);
  weatherRequest.responseType = "json";

  /*
  här kollas det så att statusen är ok med "koden" 200 och är det någon annan "kod" nummer så meddela hemasidan det. 
  */
  weatherRequest.onload = function () {
    if (weatherRequest.status != 200) {
      alert("Try again!");
    } else {
      console.log(weatherRequest.status + " " + weatherRequest.statusText);
      console.log(weatherRequest.response);
    }

    /*
    här få vi fram på hemsidan dagens temperatur om staden vi ha sökt på. försökte få det att fungera med mer ingående info men lyckades inte med det
    */
    document.querySelector("#cityName").innerText = weatherRequest.response.name;
    document.querySelector("#weatherToday").innerText = `Temp: ${weatherRequest.response.main.temp}°C`;
  };

  weatherRequest.send();
}
/*
här skapas en ny URL igen men ist för väder så försöker vi hitta olika ställen
*/
function getVenueUrl(cityName) {
  let venueUrl = new URL("https://api.foursquare.com/v2/venues/explore");

  venueUrl.searchParams.append("client_id", "J2GHLRVMY43F402WVYNN3EQWQ2UOFXULP3OVN1PXALMYHOH0");
  venueUrl.searchParams.append("client_secret", "GBL2BEBRSQ3WUMH2ZVWFYML5XR4G2Y51NRQGZXZ2GSCSPQWQ");
  venueUrl.searchParams.append("near", cityName);
  venueUrl.searchParams.append("limit", "8");
  venueUrl.searchParams.append("v", "20210315");

  return venueUrl;
}

/*
en http request som hämtar data om vilka ställen
*/
function getVenueInfo() {
  let city = searchBox.value;
  let url = getVenueUrl(city);

  let venueRequest = new XMLHttpRequest();
  venueRequest.open("GET", url);
  venueRequest.responseType = "json";

  venueRequest.onload = function () {
    console.log(venueRequest.status + " " + venueRequest.statusText);
    console.log(venueRequest.response);

    /*
    här plockar vi fram 4 ställen, försökte få till det med att få in bilder också men det gick inte så bra
    */
    document.querySelector("#venuesUrl1").innerText = venueRequest.response.response.groups[0].items[0].venue.name;
    document.querySelector("#venuesUrl2").innerText = venueRequest.response.response.groups[0].items[1].venue.name;
    document.querySelector("#venuesUrl3").innerText = venueRequest.response.response.groups[0].items[2].venue.name;
    document.querySelector("#venuesUrl4").innerText = venueRequest.response.response.groups[0].items[3].venue.name;
  };
  venueRequest.send();
}

/*
när man söker på en stad så kallar den på dessa 2 funtioner samtidigt
*/
let search = document.querySelector("#btn");
search.addEventListener("click", function () {
  getWeatherInfo();
  getVenueInfo();
});

/*
här har vi checkboxarna så dom fungera när man trycker i deras alternativ, dock så funkar den på fel håll, dvs ha du bockat i Only Attractions så syns vädret,
bockar man i Only Weather så syns bara attractionerna. har man båda i fyllda så syns inget.
*/

document.getElementById("onlyWeather").onchange = function () {
  let wDiv = document.getElementById("weather");
  wDiv.classList.toggle("hidden");
};

document.getElementById("onlyAttraction").onchange = function () {
  let vDiv = document.getElementById("venue");
  vDiv.classList.toggle("hidden");
};