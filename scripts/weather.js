const cron = require('node-cron');
const axios = require('axios');
// * * * * * *
// | | | | | |
// | | | | | day of week
// | | | | month
// | | | day of month
// | | hour
// | minute
// second ( optional )

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = async (city) => {
    try {
       const res = await axios.post(`${baseUrl}?lat=12.9141&lon=74.8560&appid=${process.env.WEATHER_API_KEY}`);
       const tempCel = res?.data?.main?.temp - 273.15
       console.log(tempCel)
       return res;
    } catch(err) {
        console.log(err)
    }
}

exports.getWeather = () => {
    cron.schedule('* /30 * * * *', function() {
        console.log('running a task every minute');
        getWeather();
    });
}
