const request = require('request');

const forecast = (lat, lgn, callback) => {
    const location = lat + ',' + lgn;
    const url = 'http://api.weatherstack.com/current?access_key=a94bd6b4f2fcdbf4f377deacb1c0d8a3&query=' + location;

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined);
        } else if (body.error) {
            callback('Could not find data. Try another location.', undefined);
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0] + '. The temperature is ' + body.current.temperature + ' degrees out and the humidity is ' + body.current.humidity + '.',
                time: body.location.localtime
            })
        }
    });

}

module.exports = forecast