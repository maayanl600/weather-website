const request = require('request')

const geocode = (address, callback)  => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFheWFubGlwa2luIiwiYSI6ImNrNmM3Y3owMzBpcWwzbm92NXVvejl1b3oifQ.kuS_8U4pElVYA8VJvxWKdA'
    request.get(url, (error, response) => {
        if (error) {
            return callback(error, undefined)
        }
        const data = JSON.parse(response.body)
        if (data.features.length === 0) {
            const error = 'Location was not found. Try another location!'
            return callback(error, undefined)
        }
        const longtitude = data.features[0].center[1]
        const latitude = data.features[0].center[0]
        const location = data.features[0].place_name
        callback(undefined, {
            longtitude,
            latitude,
            location
        })
        
    })
}

module.exports = geocode