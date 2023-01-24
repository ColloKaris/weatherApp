const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

//Function to update the UI
const updateUI = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;

    // update details template
    details.innerHTML =`
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
        `;

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
})