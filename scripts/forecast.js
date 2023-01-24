const key = 'U2FmliuCgYgEonPTgBUHW8n9rmxLuoWo';

//get weather information
const getWeather = async (id) => {
    const config = {params: {apikey:key}}
    const response = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${id}`, config);
    return response.data[0];
}


//get city information
const getCity = async (city) => {
    try{
        const config = {params: {apikey:key, q:city}}
        const response = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search`, config)
        return response.data[0];
        //console.log(response.data[0].Key);
    }
    catch(e){
        console.log("ERROR!!!", e)
    }
}