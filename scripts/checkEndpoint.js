const axios = require('axios')

const checkEndpoint = async () => {
    let data;
    try {
        const res = await axios.post('https://integratestg.e-food.gr/api/v1/partners/login',{
            "username":"captainspec",
            "password":"captainspecX!foody2023"
        }, {
            headers: {
                'Content-Type': 'application/json',
                
              }
        })
        data = res
    }catch(err){
        console.log(err)
    }

    console.log(data)
    return data?.data
}

exports.checkEndpoint = checkEndpoint