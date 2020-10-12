function generateDays(numberDays) {
  
  let x = numberDays;
  console.log(x);

  let apiWeather = null;
  let city = document.getElementById('city-input').value;
  const options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

  if(city==''){
    // Création de l'objet apiWeather
    apiWeather = new API_WEATHER();
    
  }else{
    apiWeather = new API_WEATHER(city);
  }

  
  let select  = document.getElementById('daysOption');
  
  if(x === 4){


    // Appel de la fonction fetchTodayForecast
    apiWeather
      .fetchTodayForecast()
      .then(function(response) {
        // Récupère la donnée d'une API
        const data = response.data;

        // On récupère l'information principal
        const main = data.weather[0].main;
        const description = data.weather[0].description;
        const temp = data.main.temp;
        const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);


        // Modifier le DOM
        document.getElementById('city').innerHTML = 'Aujourd\'hui - ' + data.name;
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

        data.map(element =>{
          
          // On récupère l'information principal
          const main = element.weather[0].main;
          const description = element.weather[0].description;
          const temp = element.temp.day;
          const icon = apiWeather.getHTMLElementFromIcon(element.weather[0].icon);
          const dt = element.dt;
          const date = new Date(dt*1000);
          
          // Modifier le DOM
          document.getElementById(`today-forecast-main-next${i.toString()}`).innerHTML = main;
          document.getElementById(`today-forecast-more-info-next${i.toString()}`).innerHTML = description;
          document.getElementById(`icon-weather-container-next${i.toString()}`).innerHTML = icon;
          document.getElementById(`today-forecast-temp-next${i.toString()}`).innerHTML = `${temp}°C`;
          document.getElementById(`date${i.toString()}`).innerHTML = date.toLocaleString("fr-FR", options);
          i++;
          for(let j=4;j<15;j++){
              document.getElementById(`nextDay${j.toString()}`).style.display = 'none';
          }
        })
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });

  }else if(x != undefined){
    

    apiWeather
    .getTwoWeekForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data.list;
      
      let i=1;

        for(let j=0;j<x;j++){

          for(let k=4;k<=x;k++){
              document.getElementById(`nextDay${k.toString()}`).style.display = 'unset';
          }
          
          // On récupère l'information principal
          const main = data[j].weather[0].main;
          const description = data[j].weather[0].description;
          const temp = data[j].temp.day;
          const icon = apiWeather.getHTMLElementFromIcon(data[j].weather[0].icon);
          const dt = data[j].dt;
          const date = new Date(dt*1000);

          // Modifier le DOM
          document.getElementById('city').innerHTML = 'Aujourd\'hui - ' + response.data.city.name;
          document.getElementById(`today-forecast-main-next${i.toString()}`).innerHTML = main;
          document.getElementById(`today-forecast-more-info-next${i.toString()}`).innerHTML = description;
          document.getElementById(`icon-weather-container-next${i.toString()}`).innerHTML = icon;
          document.getElementById(`today-forecast-temp-next${i.toString()}`).innerHTML = `${temp}°C`;
          document.getElementById(`date${i.toString()}`).innerHTML = date.toLocaleString("fr-FR", options);
          
          i++;

        }
    
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });
    
  }
      
}

const moreDays = () => {

  let select  = document.getElementById('daysOption');

  select.addEventListener('change', ()=>{
    if(select.value==='7 jours'){
      generateDays(7);
    }else if(select.value==='14 jours'){
      generateDays(14);
    }else if(select.value==='4 jours'){
      generateDays(4);
    }
  })


}

