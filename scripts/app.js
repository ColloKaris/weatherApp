const cityForm = document.querySelector('form');

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
        .then(data => {
            console.log(data)
        })
        .catch((e) => {
            console.log("ERROR!!", e)
        })
})