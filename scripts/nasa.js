//Base url: https://api.nasa.gov/planetary/apod?api_key=40c5TVkeAztBVQGMySMrLyuxaA50vTbiUTXAoUkD
// https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY

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

const baseUrl = "https://api.nasa.gov/neo/rest/v1/feed";
let date = new Date().toISOString().split('T')[0]
const endDate = "2022-06-20"
console.log(date)
const getAstData = async () => {
    try {
      const res = await axios.get(`${baseUrl}?start_date=${date}&end_date=${endDate}&api_key=${process.env.NASA_API_KEY}`);
      console.log(res?.data?.near_earth_objects)
      return res;
    } catch(err) {
        console.log(err)
    }
}

exports.getAsteroidData = () => {
    cron.schedule('* * * * *', function() {
        console.log('running a task every minute');
        getAstData();
    });
}
