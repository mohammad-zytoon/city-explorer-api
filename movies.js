'use strict';

const axios = require('axios');

class Movie {
    constructor(item) {
        this.title = item.original_title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;
        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
        
    }
}

function movieHandler(req, res) {

    let key = process.env.MOVIE_API_KEY;
    let mQuery = req.query.quearySearch;
    let mUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${mQuery}`;
    

    axios
        .get(mUrl)
        .then(result => {
            const mArray = result.data.results.map(movieItem => {
                return new Movie(movieItem);
            })
            res.send(mArray);
        })
        .catch(error => {

            res.status(500).send(`Movie data related to this city is not found ${error}`);
        })
}





module.exports = movieHandler;