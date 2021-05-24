'use strict';

require('dotenv').config();
const express = require('express');
const weatherData = require('./weather.json');
const cors = require('cors');

const server = express();
server.use(cors());
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`server listen ${PORT}`);
})

// // http://localhost:3001/weather
// server.get('/weather', (request, response) => {
//     let str = 'hello from back end';
//     response.status(200).send(str);
// })

class ForCast {
    constructor(date,description) {
        this.date = date;
        this.description = description;
    }
}

server.get('/weather', (req, res) => {
    let citysearch = req.query.searchQuery;
    let lat= req.query.lat;
    let long= req.query.long;
    let ch = true;
    let found = weatherData.find((element) => {
        if (citysearch.toLowerCase() == element.city_name.toLowerCase()&& lat==element.lat && long== element.lon){
            ch = false;
        return element;
        }
    
    })

    if (ch == false) {
        let forcastArr = [];
        let date;
        let description;
        let forcastData;
        for(let i=0;i<found.data.length;i++){
            date = found.data[i].valid_date;
            description = `low of ${found.data[i].min_temp}, hight of${found.data[i].max_temp} with ${found.data[i].weather.description}`;
            forcastData = new ForCast(date,description);
            forcastArr.push(forcastData);
        
    }  res.send(forcastArr);}
    else {
        res.send('Error');
    }
})




// class ForCast {
//     constructor(date, description) {
//         this.date = date;
//         this.description = description;
//     }
// }
// server.get('/weather', (req, res) => {
//     let city = req.query.searchQuery;
//     let e = true;
//     let found = weatherData.find((element) => {
//         if (city.toLowerCase() == element.city_name.toLowerCase()) {
//             e = false;
//             return element;
//         }
//     })
//     if (e == false) {
//         // date = found.data[0].valid_date
//         // `low of ${found.data[0].min_temp}, hight of${found.data[0].max_temp} with ${found.data[0].weather.description}`
//         let forcastArr = [];
//         let date;
//         let description;
//         let forcastData;
//         for(let i=0;i<found.data.length;i++){
//             date = found.data[0].valid_date;
//             description = `low of ${found.data[i].min_temp}, hight of${found.data[i].max_temp} with ${found.data[i].weather.description}`;
//             forcastData = new ForCast(date,description);
//             forcastArr.push(forcastData);
//         }
        
//         res.send(forcastArr);
//     } else {
//         res.send('error');
//     }
// })

