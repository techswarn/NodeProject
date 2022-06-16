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

const getfunc = async() => {
    try{
        const res = await axios.get('https://swarn.tk/funcdemoexpress')
        console.log(res?.data)
    }catch(err){
        console.log(err)
    }
}

const getWeather = async (city) => {
    try {
       const res = await axios.post(`${baseUrl}?lat=12.9141&lon=74.8560&appid=${process.env.WEATHER_API_KEY}`);
       const tempCel = res?.data?.main?.temp - 273.15
       console.log(`Temperature in mangalore is ${tempCel}`)
       return res;
    } catch(err) {
        console.log(err)
    }
}

exports.getWeather = () => {
    cron.schedule('*/5 * * * *', function() {
        console.log('running a task every minute');
        getfunc()
        getWeather();
    });
}
