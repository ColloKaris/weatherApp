const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

//Function to update the UI
const updateUI = (data) => {
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //Destructure properties. Does the same thing as the two
    //commented lines above
    const {cityDets, weather} = data;

    // update details template
    details.innerHTML =`
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
        `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc)

    //Ternary operator
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    
    //THE ABOVE LINES REPLACES THIS CODE BELOW
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg'
    // } else{
    //     timeSrc = 'img/night.svg'
    // }
     time.setAttribute('src', timeSrc);


    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};


//is an async function becasue in this function, we will be calling
//asynchronous function and thus it is going to take some time to complete
const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);
    //return an object from this function
    return {cityDets,weather};
}

cityForm.addEventListener('submit', (e) => {
    //prevent default action so that it doesn't refresh the page
    e.preventDefault();

    //get the values that a user types in
    const city = cityForm.city.value.trim();
    //clear out the form fields
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch((e) => {
            console.log("ERROR!!", e)
        })

    //set local storage
    //this will always be the most recent location that the user
    //has entered this is because it will be rest it time a new
    //value is entered
    localStorage.setItem('city', city);
})

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log("ERROR!!!", err))
}