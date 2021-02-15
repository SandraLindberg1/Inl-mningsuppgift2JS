"use strict"

// Openweather URL
function getWeatherUrl(city) {
  const weatherUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
  const apiKey = 'bfcd6b0cb6794e54cb615620f418b9be';

  // Sökparametrarna jag vill hämta
  weatherUrl.searchParams.append('q', city);
  weatherUrl.searchParams.append('appid', appID);
  weatherUrl.searchParams.append('mode', 'json');
  weatherUrl.searchParams.append('units', 'metric');
  weatherUrl.searchParams.append('lang', 'en');

  // returnera URL
  return weatherUrl;
}

// Foursquare URL
function getVenueUrl(city) {
  const venueUrl = new URL('https://api.foursquare.com/v2/venues/explore');
  const clientId = 'J2GHLRVMY43F402WVYNN3EQWQ2UOFXULP3OVN1PXALMYHOH0';
  const clientSecret = 'GBL2BEBRSQ3WUMH2ZVWFYML5XR4G2Y51NRQGZXZ2GSCSPQWQ';

  // Sökparametrarna jag vill hämta
  venueUrl.searchParams.append('near', city);
  venueUrl.searchParams.append('client_id', clientId);
  venueUrl.searchParams.append('client_secret', clientSecret);
  venueUrl.searchParams.append('v', today);
  venueUrl.searchParams.append('limit', '4');

  // returnera URL
  return venueUrl;
}

/* Vet att det är halvklart men jag få komplettera mer sen när jag har fått böckerna så jag kan läsa
ännu mer och se andra exempel för blir inte klok på att googla och få flera olika lösningar på samma sak,
det blir så förvirrande. Försöker även hitta tips och ideér på klasskompisarnas public
repo men då känns det som om man typ fuska sig igenom det och det blir mer som copy paste.
Och det känns inte bra det heller. Så vill gärna läsa på lite till innan jag lämnar in det helt färdigt. */