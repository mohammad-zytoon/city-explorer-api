'use strict';
const axios = require('axios');


class ForCast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = `low of ${item.min_temp}, hight of${item.max_temp} with ${item.weather.description}`;
    }
}

function weatherHandler(req, res) {

    let key = process.env.WEATHER_API_KEY;
    let cityWeatherQuery = req.query.quearySearch;
    let wUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityWeatherQuery}&key=${key}`;

    axios
        .get(wUrl)
        .then(result => {
            const weatherArray = result.data.data.map(weatherItem => {
                return new ForCast(weatherItem);
            })
            res.send(weatherArray);
        })
        .catch(error => {

            res.status(500).send(`Sorry The Weather Stat Could Not Reached ${error}`);
        })
}

module.exports = weatherHandler;