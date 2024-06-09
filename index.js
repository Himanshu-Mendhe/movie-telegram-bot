const { BOT_ID, API_KEY } = require('./config/env-config.js');
const { Telegraf } = require('telegraf');
const express = require('express');
const axios = require('axios');

const bot = new Telegraf(BOT_ID);
const app = express();
const port = 3000;

// Define the fetchMovie function
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

const startCommand = (ctx) => {
    ctx.reply('Welcome to the bot, what do you want to do', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Movies Info 🍿', callback_data: 'movies' }
                ],
                [
                    { text: 'Popular Movies', callback_data: 'popularMovies' }
                ],
                [
                    { text: 'Box Office Collection', callback_data: 'boxOffice' }
                ],
                [
                    { text: 'Most Anticipated Movies', callback_data: 'anticipated' }
                ],
                [
                    { text: 'restart 👀', callback_data: 'restart' }
                ]
            ]
             
        },
        parse_mode: "Markdown",
        disable_web_page_preview: true
    });
};

const restartAfterResult = (ctx) => {
    ctx.reply('🔎 \n for restarting the bot click the following button', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'restart 👀', callback_data: 'restart' }
                ]
            ]
        },
        parse_mode: "Markdown",
        disable_web_page_preview: true
    });
};

bot.start((ctx)=>{
    startCommand(ctx)
})


bot.action('restart',(ctx)=>{
    ctx.reply("restarting the bot");
    startCommand(ctx)
})

const movieReply = () => {
    bot.on('text', async (ctx) => {
        const userInput = ctx.message.text;
        try {
            const movieData = await fetchMovie(userInput);

            if (movieData.Response === 'False') {
                ctx.reply(`Sorry, I couldn't find any movie with the title "${userInput}".`);
            } else {
                const replyMessage = `
*Title:* ${movieData.Title}
*Year:* ${movieData.Year}
*Rated:* ${movieData.Rated}
*Released:* ${movieData.Released}
*Runtime:* ${movieData.Runtime}
*Genre:* ${movieData.Genre}
*Director:* ${movieData.Director}
*Writer:* ${movieData.Writer}
*Actors:* ${movieData.Actors}
*Plot:* ${movieData.Plot}
*Language:* ${movieData.Language}
*Country:* ${movieData.Country}
*Awards:* ${movieData.Awards}
*IMDB Rating:* ${movieData.imdbRating}
`;
                ctx.replyWithMarkdown(replyMessage);
            }
            restartAfterResult(ctx);
        } catch (error) {
            ctx.reply('An error occurred while fetching the movie data. Please try again later.');
        }
    });
}

const popularReply = async() => {
    try {
        const popularData = await popularMovie()
        const oneReplyData = `
        *Title*:${popularData.title},
        *Year*:${popularData.year}`
        for (let index = 0; index < popularData.length; index++) {
            ctx.replyWithMarkdown(oneReplyData);
        }
    } catch (error) {
        ctx.reply('error in fetching the popular movies')
    }
}


bot.on('callback_query', (ctx) => {
    const callbackData = ctx.callbackQuery.data;

    if (callbackData === 'movies') {
        ctx.reply('You clicked Movies. Please enter the name of the movie:');
        movieReply();
    }
    else if (callbackData === 'popularMovies') {
        ctx.reply('You clicked Popular Movies.');
        popularReply();
    }
    else if (callbackData === 'boxOffice') {
        ctx.reply('You clicked Box Office Collection.');
        reply();
    }
    else if (callbackData === 'anticipated') {
        ctx.reply('You clicked Most Anticipated Movies.');
        reply();
    }
    else {
        ctx.reply('Unknown option');
    }
});

bot.launch();