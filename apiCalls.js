const axios = require('axios');
const { BOT_ID, API_KEY } = require('./config/env-config.js');

const fetchMovie = async (title, year) => {
    try {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                t: title,
                y: year,
                apikey: API_KEY,
                plot: 'full'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from OMDb API:', error);
        throw new Error('Internal Server Error');
    }
};

const popularMovie = async () => {
    try {
        const response = await axios.get('https://api.trakt.tv/movies/popular');
        return response.data;
    } catch (error) {
        console.error('Error fetching data from trakt API:', error);
        throw new Error('Internal Server Error');
    }
};

const anticipated = async () => {
    try {
        const response = await axios.get('https://api.trakt.tv/movies/anticipated');
        return response.data;
    } catch (error) {
        console.error('Error fetching data from trakt API:', error);
        throw new Error('Internal Server Error');
    }
};

const boxOffice = async () => {
    try {
        const response = await axios.get('https://api.trakt.tv/movies/boxoffice');
        return response.data;
    } catch (error) {
        console.error('Error fetching data from trakt API:', error);
        throw new Error('Internal Server Error');
    }
};

module.exports = {
    fetchMovie,
    popularMovie,
    anticipated,
    boxOffice
}