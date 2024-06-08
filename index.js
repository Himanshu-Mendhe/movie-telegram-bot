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

const startCommand = (ctx) => {
    ctx.reply('Welcome to the bot, what do you want to do', {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Information about Movies', callback_data: 'movies' },
                    { text: 'restart', callback_data: 'restart' }
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
    ctx.reply("restarting the bot")
    startCommand(ctx)
})

const reply = () => {
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
                ctx.reply(replyMessage);
            }

            
            
        } catch (error) {
            ctx.reply('An error occurred while fetching the movie data. Please try again later.');
        }
    });
}


bot.on('callback_query', (ctx) => {
    const callbackData = ctx.callbackQuery.data;

    if (callbackData === 'movies') {
        ctx.reply('You clicked Movies. Please enter the name of the movie:');
        reply();
    }
    else {
        ctx.reply('Unknown option');
    }
});

bot.launch();