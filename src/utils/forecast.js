const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/bab9b9aadc24a87b6bf70625d9acb182/' + longtitude + ',' + latitude
    request.get(url, (error, response) => {
        if (error) {
            return callback(error, undefined)
        }
        const data = JSON.parse(response.body)
        const forecast = 'It is currently ' + data.currently.temperature + ' degrees out. There is a ' + data.currently.precipProbability + '% chance of rain.'
        callback(undefined, { forecast })
    })
}

module.exports = forecast