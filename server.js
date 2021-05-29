'use strict';

require('dotenv').config();
const express = require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');
const axios = require('axios');


const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`server listening ${PORT}`);
})
const movieHandler=require('./movies');
server.get('/movie', movieHandler);

const weatherHandler=require('./weather');
server.get('/weather',weatherHandler);

// function weatherHandler(req, res) {

//     let key = process.env.WEATHER_API_KEY;
//     let cityWeatherQuery = req.query.quearySearch;
//     let wUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityWeatherQuery}&key=${key}`;

//     axios
//         .get(wUrl)
//         .then(result => {
//             const weatherArray = result.data.data.map(weatherItem => {
//                 return new ForCast(weatherItem);
//             })
//             res.send(weatherArray);
//         })
//         .catch(error => {

//             res.status(500).send(`Sorry The Weather Stat Could Not Reached ${error}`);
//         })
// }

// function movieHandler(req, res) {

//     let key = process.env.MOVIE_API_KEY;
//     let mQuery = req.query.quearySearch;
//     let mUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${mQuery}`;
    

//     axios
//         .get(mUrl)
//         .then(result => {
//             const mArray = result.data.results.map(movieItem => {
//                 return new Movie(movieItem);
//             })
//             res.send(mArray);
//         })
//         .catch(error => {

//             res.status(500).send(`Movie data related to this city is not found ${error}`);
//         })
// }

// server.get('*', (req, res) => {
//     res.send('cant reached');
// })

// class Movie {
//     constructor(item) {
//         this.title = item.original_title;
//         this.overview = item.overview;
//         this.average_votes = item.vote_average;
//         this.total_votes = item.vote_count;
//         this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
//         this.popularity = item.popularity;
//         this.released_on = item.release_date;
        
//     }
// }
// class ForCast {
//     constructor(item) {
//         this.date = item.valid_date;
//         this.description = `low of ${item.min_temp}, hight of${item.max_temp} with ${item.weather.description}`;
//     }
// }
   

//////
// server.get('/weather', (req, res) => {
//     let city = req.query.quearySearch;
//     let lat = req.query.lat;
//     let long = req.query.lon;
    
//     let found = weatherData.find((element) => {
//         if (city.toLowerCase() == element.city_name.toLowerCase() ) {
            
//             return element;
//         }
        
//     })
//     try {
       
//         let forcastArr = [];
//         let date;
//         let description;
//         let forcastData;
//         for (let i = 0; i < found.data.length; i++) {
//             date = found.data[i].valid_date;
//             description = `low of ${found.data[i].min_temp}, hight of${found.data[i].max_temp} with ${found.data[i].weather.description}`;
//             forcastData = new ForCast(date, description);
//             forcastArr.push(forcastData);
//         }
        
//         res.send(forcastArr);
//     } catch(error) {
//         res.status(500).send('Try Another City Please');
//     }
//     })
//     server.get('*', (req, res) => {
//         res.send('cant reached');
//     })
    
