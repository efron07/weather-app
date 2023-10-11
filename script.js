'use strict'

const search = document.querySelector('.input-search');
const searchBtn = document.querySelector('.search');
const weatherCard = document.querySelector('.cards')
const currentCard = document.querySelector('.side1')

const api_key ="5de6ae3a1bd3c19f43002e8c9ed56375";

const createWeatherCard =(name,element,index)=>{
                const dateTimeString = element.dt_txt;
                const dateTime = new Date(dateTimeString);

                // Get the day of the week as an integer (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
                const dayOfWeek = dateTime.getDay();

                // Define an array to map the integer to the day name
                const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

                // Get the day name from the array
                const day= daysOfWeek[dayOfWeek];

                const icon = element.weather[0].icon;

    const date = element.dt_txt.split(' ')[0]
    if(index == 0){
        return `<div class="loc-date">
            <p class="loc-title">${name},Tanzania</p>
            <p class="loc-title">Today,sept 10</p>
         </div>
         <div class="sun-icon">
            <p class="time-text">${day}, 12:45</p>
             <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="sun-icon">
             <p class="sun-plus"><span class="text-sun-big">${element.main.temp} C°</span></p>
         </div>
         
         <div class="today-data">
            <div class="rain-chance">
                <p class="p-text">Wind speed</p>
                <div class="rain-icon-text">
                    <img class="rain-icon" src="img/Icon metro-wind.svg" alt="">
                    <p class="p-text">${element.wind.speed}</p>
                </div>
            </div>
            <div class="rain-chance">
                <p class="p-text">Humidity</p>
                <div class="rain-icon-text">
                    <img class="rain-icon" src="img/water-drop.png" alt="">
                    <p class="p-text">${element.main.humidity}</p>
                </div>
            
            </div>
            <div class="rain-chance">
                <p class="p-text">Pressure</p>
                <div class="rain-icon-text">
                    <img class="rain-icon" src="img/Icon metro-rainy.svg" alt="">
                    <p class="p-text">${element.main.pressure}</p>
                </div>
            
            </div>
         </div>`
       
    }else{

        return ` <div class="card">
                        <div class="card-title">
                            <p class="p-text day">${day}</p>
                            <p class="p-text date"> ${date}</p>
                        </div>
                        <div class="card-details">
                            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="">
                            <p class="sun-text">${(element.main.temp -273.15).toFixed(2)} C°</p>
                            <p class="temperature">Temperature</p>
                        </div>
                    
                    </div>`
    }
}











const getWeatherData =  (name,lat,lon)=>{
    const weatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`
    
     fetch(weatherURL).then(res=>res.json()).then(data=>{
         //filter only one fore cast day
         console.log(data);
         const uniqueDay = [];
         const fiveDays = data.list.filter(day=>{
            const dayDate = new Date(day.dt_txt).getDate();
            if(!uniqueDay.includes(dayDate)){
                return uniqueDay.push(dayDate);
            }
         });
         
          search.value= '';
          weatherCard.innerHTML= '';
          currentCard.innerHTML = ''

          fiveDays.forEach((element,index )=> {
            if(index === 0){
                currentCard.insertAdjacentHTML('beforeend', createWeatherCard(name,element,index));

            }else{

                weatherCard.insertAdjacentHTML('beforeend', createWeatherCard(name,element,index));
            }

         });
     }).catch((error)=>{
        console.log(error);
     });
}


//getting coordinate and name of the city using openweather API
const getCoordinateName = async ()=>{
     try {
        const cityName = search.value.trim();
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`
        if(!cityName) return; // chack if there is no city name provided
        const response = await fetch(geoUrl) ;
        
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
       const data = await response.json();
       console.log(data);

       if (!data.length) {
      throw new Error("NOT A VALID CITY")
       }
       const {name,lat,lon} = data[0];

       getWeatherData(name,lat,lon); //calling function to feach data

    } catch (error) {
        return  console.log(error);
    }
    
       
}
searchBtn.addEventListener('click',getCoordinateName);


















































const unit = document.querySelector('.text-sun-big').innerHTML.split(' ')[0] * 1;
let datatemp = document.querySelector('.text-sun-big').innerHTML;
//toogle button

 // Function to convert Celsius to Fahrenheit
        function celsiusToFahrenheit(celsius) {
            return (celsius * 9/5) + 32;
        }

        // Function to convert Fahrenheit to Celsius
        function fahrenheitToCelsius(fahrenheit) {
            return (fahrenheit - 32) * 5/9;
        }

        var toggleButton = document.getElementById("unit-toggle");
        var isCelsius = true;
        toggleButton.addEventListener("click", function() {
            if (isCelsius) {
                toggleButton.textContent = "Fahrenheit";
                isCelsius = false;
                var celsiusTemperature = unit;
                var fahrenheit = celsiusToFahrenheit(unit);
                document.querySelector('.text-sun-big').innerHTML = `${fahrenheit} F°`;
                return fahrenheit
            } else {
                toggleButton.textContent = "Celsius";
                isCelsius = true;
                var fahrenheitTemperature = unit;
                var celsius = parseFloat(fahrenheitToCelsius(unit).toFixed(1));
                    
                document.querySelector('.text-sun-big').innerHTML = `${celsius} C°`
            }
        })
        
        // chart for line and graph
 const ctx = document.getElementById('myChart');

                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                        datasets: [{
                            label: 'Temperature',
                            data: [12, 19, 3, 5, 2, 3],
                            borderWidth: 1,
                            borderColor:"#1E8FF2",
                            backgroundColor:'#2699FB'
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
                

 const barGraph = document.getElementById('myChart2');

                new Chart(barGraph, {
                    type: 'bar',
                    data: {
                        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'],
                        datasets: [{
                            label: 'Temterature',
                            data: [12, 19, 3, 5, 2, 3,10],
                            borderWidth: 1,
                            borderColor:"#1E8FF2",
                            backgroundColor:'#1E8FF2'
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });