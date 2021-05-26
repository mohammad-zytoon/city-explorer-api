'use strict';


require('dotenv').config();
const express = require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');


const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`server listening ${PORT}`);
})
server.get('/weather', (req, res) => {
    let city = req.query.quearySearch;
    let lat = req.query.lat;
    let long = req.query.lon;
    
    let found = weatherData.find((element) => {
        if (city.toLowerCase() == element.city_name.toLowerCase() ) {
            
            return element;
        }
        
    })
    try {
       
        let forcastArr = [];
        let date;
        let description;
        let forcastData;
        for (let i = 0; i < found.data.length; i++) {
            date = found.data[i].valid_date;
            description = `low of ${found.data[i].min_temp}, hight of${found.data[i].max_temp} with ${found.data[i].weather.description}`;
            forcastData = new ForCast(date, description);
            forcastArr.push(forcastData);
        }
        
        res.send(forcastArr);
    } catch(error) {
        res.status(500).send('Try Another City Please');
    }
    })
    server.get('*', (req, res) => {
        res.send('cant reached');
    })
class ForCast {
    constructor(date, description) {
        this.date = date;
        this.description = description;
    }
}
    
    
