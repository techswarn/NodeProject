const axios = require('axios')

const checkEndpoint = async () => {
    const {data} = await axios.post('https://integratestg.e-food.gr/api/v1/partners/login',{
        "username":"captainspec",
        "password":"captainspecX!foody2023"
    }, {
        headers: {
            'Content-Type': 'application/json',
            
          }
    })

    console.log(data)
    return data
}

exports.checkEndpoint = checkEndpoint