'use strict'
//------------------------------variables
const search = document.querySelector('.input-search');
const searchBtn = document.querySelector('.search');
const weatherCard = document.querySelector('.cards')
const currentCard = document.querySelector('.side1')
const locationBtn = document.querySelector('.locationBtn')

// const toggleButton = document.getElementById("unit-toggle");
const unitLabel = document.getElementById("unit");

//----------------------------------api key
const api_key ="5de6ae3a1bd3c19f43002e8c9ed56375";

// ------------------------------------------function to convert celsious to ferhnehit temp unit

    function celsiusToFahrenheit(celsius) {
            return (celsius * 9/5) + 32;
        }

        // Function to convert Fahrenheit to Celsius
        function fahrenheitToCelsius(fahrenheit) {
            return (fahrenheit - 32) * 5/9;
        }

        // Get a reference to the button
        var toggleButton = document.getElementById("unit-toggle");

        // Initial unit is Celsius
        var isCelsius = true;

        // Add a click event listener to the button
        toggleButton.addEventListener("click", function() {
            // Toggle between Celsius and Fahrenheit
            if (isCelsius) {
                toggleButton.textContent = "Fahrenheit";
                isCelsius = false;
                // Convert and display temperature in Fahrenheit
                var celsiusTemperature = 25;
                var fahrenheitTemperature = celsiusToFahrenheit(celsiusTemperature);
                console.log(celsiusTemperature + "°C is equal to " + fahrenheitTemperature + "°F");
            } else {
                toggleButton.textContent = "Celsius";
                isCelsius = true;
                // Convert and display temperature in Celsius
                var fahrenheitTemperature = 77;
                var celsiusTemperature = fahrenheitToCelsius(fahrenheitTemperature);
                console.log(fahrenheitTemperature + "°F is equal to " + celsiusTemperature + "°C");
            }
        });

//------------------------------------------function to convert date
const convertdate=(inputDate)=>{

            // Create a Date object from the input date
            const dateObj = new Date(inputDate);

            // Define an array for the month names
            const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            // Get the month and day components
            const month = monthNames[dateObj.getMonth()];
            const day = dateObj.getDate();

            // Format the date as "MMM DD"
            const formattedDate = `${month} ${day}`;
            return formattedDate;

}

// ------------------------------------------function to convert day
const convertDay =(element)=>{

       const dateTimeString = element.dt_txt;
                const dateTime = new Date(dateTimeString);

                // Get the day of the week as an integer (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
                const dayOfWeek = dateTime.getDay();

                // Define an array to map the integer to the day name
                const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

                // Get the day name from the array
                const day= daysOfWeek[dayOfWeek];
                return day;
}

//------------------------------------- function to get current time
function getCurrentTimeWithoutSeconds() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
 }

//-------------------------------------function to get current coordinates


function getCoordinates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
      const {latitude,longitude} = position.coords;
      
      console.log(latitude,longitude)

      const REVERSE_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&units=metric&limit=1&appid=${api_key}`;
       fetch(REVERSE_URL).then(response =>response.json()).then(data =>{
        const {name, country} = data[0]
        console.log(data);
        getWeatherData(name,country,latitude,longitude);
       }).catch(()=>{
           alert `error occured while fetching data`
       });

    }, (error) => {
      console.error("Geolocation error:", error.message);
    });
  } else {
    console.error("Geolocation is not supported by your browser.");
  }
}

getCoordinates();
locationBtn.addEventListener('click',getCoordinates)


//-------------------------------------------------------function to create card for html
const createWeatherCard =(name,country,element,index)=>{

             const day = convertDay(element);
             const icon = element.weather[0].icon;
             const longDate = element.dt_txt.split(' ')[0];
             const date = convertdate(longDate);
            const time = getCurrentTimeWithoutSeconds();
          
    if(index == 0){
        return `<div class="loc-date">
            <p class="loc-title">${name},${country}</p>
            <p class="loc-title">Today,${date}</p>
         </div>
         <div class="sun-icon">
            <p class="time-text">${day},${time}</p>
             <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="sun-icon">
             <p<span class="text-sun-big">${element.main.temp}<span id="unit" class="text-sun-big">C°</span></span></p>
             <p class="weather-description">${element.weather[0].description}</p>
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
                <div class="rain-icon-text humidity">
                    <img class="humidity-icon" src="img/humidity.png" alt="">
                    <p class="p-text">${element.main.humidity}</p>
                </div>
            
            </div>
            <div class="rain-chance">
                <p class="p-text">Pressure</p>
                <div class="rain-icon-text pressure">
                    <img class="pressure-icon" src="img/pressure.png" alt="">
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
                            <p class="sun-text">${element.main.temp} C°</p>
                            <p class="temperature">Temperature</p>
                        </div>
                    
                    </div>`
    }
}
//-------------------------------------------function to get weather data
const getWeatherData =  (name,country,lat,lon)=>{
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
    
     fetch(weatherURL).then(res=>res.json()).then(data=>{
         //filter only one fore cast day
         console.log(data);

            const dailyTemperatures = data.list.map(item => item.main.temp);
            const dates = data.list.map(item => new Date(item.dt  *1000));
           
            createGraphTemperaatures(dates, dailyTemperatures);

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
                 
                currentCard.insertAdjacentHTML('beforeend', createWeatherCard(name,country,element,index));

            }else{

                weatherCard.insertAdjacentHTML('beforeend', createWeatherCard(name,country,element,index));
            }

         });
     }).catch((error)=>{
        console.log(error);
     });
}


//-------------------------------function to get coordinate and name of the city using openweather API
const getCoordinateName = async ()=>{
     try {
        const cityName = search.value.trim();
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&units=metric&limit=1&appid=${api_key}`;

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
       const {name, country,lat,lon} = data[0];

       getWeatherData(name,country,lat,lon); //calling function to feach data

    } catch (error) {
        return  console.log(error);
    }   
}
searchBtn.addEventListener('click',getCoordinateName);


//--------------------------------------------getting hourly data
async function fetchHourlyTemperatureData(name,country,lat,lon) {
  const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;
   try {
     const res = await fetch(apiUrl);
     if (!res.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await res.json();
     console.log(data);
     const hourlyTemperatures = data.hourly.map(item => item.temp);
     const hourlyTimes = data.hourly.map(item => new Date(item.dt * 1000));

    createTemperatureChart(hourlyTimes, hourlyTemperatures);
  } catch (error) {
    console.error("Error fetching data:", error);
   }
}

// ------------------------------------------chart for line and graph


let myChart;

 function createTemperatureChart (){
    const ctx = document.getElementById('myChart');

                    if (myChart) {
                    myChart.clear();
                }

             myChart =  new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels:  ['00:00','01:00', '02:00', '03:00', '04:00', '05:00','06:00', '07:00', '08:00', '09:00', '10:00', '11:00','12:00', '13:00', '14:00', '15:00', '16:00', '17:00','18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
                        datasets: [{
                            label: 'Temperature',
                            data: [23,22,23,20,24,22,19,22,23,25,24,22,18,22,20,21,24,22],
                            borderWidth: 1,
                            borderColor:"#1E8FF2",
                            backgroundColor:'#2699FB'
                        }]
                    },
                    options: {
                        tension:0.4,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
 }
  createTemperatureChart ()              
//------------------------------------------------------------graph chart
let myChart2;
function createGraphTemperaatures(dates,temperatures){

    const barGraph = document.getElementById('myChart2');
                        if (myChart2) {
                        myChart2.destroy();
                    }
                   myChart2 =new Chart(barGraph, {
                       type: 'bar',
                       data: {
                           labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                           datasets: [{
                               label: 'Temterature',
                               data:temperatures,
                               borderWidth: 1,
                               borderColor:"#1E8FF2",
                               backgroundColor:['rgb(208,207,230);',]
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
}



