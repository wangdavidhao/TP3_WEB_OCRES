
// Fonction appelée lors du click du bouton
function start() {

  let apiWeather = null;
  let city = document.getElementById('city-input').value;
  console.log(city);
 
  if(city==''){
    // Création de l'objet apiWeather
    apiWeather = new API_WEATHER();
    // Appel de la fonction fetchTodayForecast
  }else{
    apiWeather = new API_WEATHER(city);
  }
  

  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;
      //console.log(data);
      console.log(response);

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });
}

