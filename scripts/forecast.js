const key = 'U2FmliuCgYgEonPTgBUHW8n9rmxLuoWo';

//get weather information
const getWeather = async (id) => {
    const config = {params: {apikey:key}}
    const response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${id}`, config);
    console.log(response.data[0]);
}


//get city information
const getCity = async (city) => {
    try{
        const config = {params: {apikey:key, q:city}}
        const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search`, config)
        return response.data[0].Key;
        //console.log(response.data[0].Key);
    }
    catch(e){
        console.log("ERROR!!!", e)
    }
}

//This next line returns a promise, therefore we need to await it
//then we need to get the data is resolve with
//so find out how to data out of a fulfilled promise
//an easy way I have used it to just chain on .then, 
//then pass that data into a .then part of a promise handling
//later on
//try to see if this can be done with just async and await
const cityKey = getCity('Nairobi')
.then(data => {
    getWeather(data)
})
.catch
// getWeather(cityKey);

console.log(cityKey);
