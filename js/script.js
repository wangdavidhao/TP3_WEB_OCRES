function start() {

  let apiWeather = null;
  let city = document.getElementById('city-input').value;

  if(city==''){
    // Création de l'objet apiWeather
    apiWeather = new API_WEATHER();
    
  }else{
    apiWeather = new API_WEATHER(city);
  }
  
  // Appel de la fonction fetchTodayForecast
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


  apiWeather
  .getThreeDayForecast()
  .then(function(response) {
    // Récupère la donnée d'une API
    const data = response.data.list;

    let i=1;

    while(i<=data.length){

      data.map(element =>{
        
        console.log('element' , element);
        // On récupère l'information principal
        const main = element.weather[0].main;
        const description = element.weather[0].description;
        const temp = element.temp.day;
        const icon = apiWeather.getHTMLElementFromIcon(element.weather[0].icon);
        // Modifier le DOM

        document.getElementById('today-forecast-main-next' +(i).toString()).innerHTML = main;
        document.getElementById('today-forecast-more-info-next'+(i).toString()).innerHTML = description;
        document.getElementById('icon-weather-container-next'+(i).toString()).innerHTML = icon;
        document.getElementById('today-forecast-temp-next'+(i).toString()).innerHTML = `${temp}°C`;
        i++;

      })

    }
    
  })
  .catch(function(error) {
    // Affiche une erreur
    console.error(error);
  });
      
}

