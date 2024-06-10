const { BOT_ID, API_KEY } = require('./config/env-config.js');
const {fetchMovie, popularMovie, anticipated, boxOffice, mostPlayed} = require('./apiCalls.js')
const { Telegraf } = require('telegraf');

const bot = new Telegraf(BOT_ID);

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
                    { text: 'Recent Box Office Collection', callback_data: 'boxOffice' }
                ],
                [
                    { text: 'Most Anticipated Movies', callback_data: 'anticipated' }
                ],
                [
                    { text: 'Weekly Most Played Movies', callback_data: 'played' }
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

bot.action('restart', async(ctx)=>{
    await ctx.reply("restarting the bot");
    await startCommand(ctx)
})

bot.on('callback_query', (ctx) => {
    const callbackData = ctx.callbackQuery.data;

    if (callbackData === 'movies') {
        ctx.reply('You clicked Movies. Please enter the name of the movie:');
        movieInfoReply();
    }
    else if (callbackData === 'popularMovies') {
        ctx.reply('You clicked Popular Movies.');
        popularReply(ctx);
    }
    else if (callbackData === 'boxOffice') {
        ctx.reply('You clicked Box Office Collection.');
        boxOfficeReply(ctx);
    }
    else if (callbackData === 'played') {
        ctx.reply('You clicked Most Played.');
        mostPlayedReply(ctx);
    }
    else if (callbackData === 'anticipated') {
        ctx.reply('You clicked Most Anticipated Movies.');
        anticipatedReply(ctx);
    }
    else {
        ctx.reply('Unknown option');
    }
});

const movieInfoReply = () => {
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
                await ctx.replyWithMarkdown(replyMessage);
            }
            await restartAfterResult(ctx);
        } catch (error) {
            ctx.reply('An error occurred while fetching the movie data. Please try again later.');
        }
    });
}

const movieInfoReplyForOutput = async(ctx) => {
   
        const userInput = movie.title;
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
                await ctx.replyWithMarkdown(replyMessage);
            }
            await restartAfterResult(ctx);
        } catch (error) {
            ctx.reply('An error occurred while fetching the movie data. Please try again later.');
        };
}

const popularReply = async(ctx) => {
    try {
        const popularData = await popularMovie()
        let inline_keyboard = [];
        for (let index = 0; index < popularData.length; index++) {
            const movie = popularData[index];
            inline_keyboard.push([{ text: `Title*:${movie.title}\n*Year*:${movie.year}`, callback_data: movieInfoReplyForOutput() }])
        }            
        ctx.reply('here are most popular movies', {
            reply_markup: {
                inline_keyboard     
            },
    parse_mode: "Markdown",
    disable_web_page_preview: true
    });

    } catch (error) {
        ctx.reply('error in fetching the popular movies')
    }
}

const boxOfficeReply = async(ctx) => {
    try {
        const boxOfficeData = await boxOffice()
        for (let index = 0; index < boxOfficeData.length; index++) {
            const movies = boxOfficeData[index];
            const oneReplyData = `
*Title*: ${movies.movie.title},
*Anticipated Year*: ${movies.movie.year}
*Revenue*: ${movies.revenue}`
            ctx.replyWithMarkdown(oneReplyData);
        }

    } catch (error) {
        //ctx.reply('error in fetching the popular movies')
        console.log ( error )
    }
}

const anticipatedReply = async(ctx) => {
    try {
        const anticipatedData = await anticipated()
        for (let index = 0; index < anticipatedData.length; index++) {
            const movies = anticipatedData[index].movie;
            const oneReplyData = `
*Title*: ${movies.title},
*Anticipated Year*: ${movies.year}`
            ctx.replyWithMarkdown(oneReplyData);
        }

    } catch (error) {
        //ctx.reply('error in fetching the popular movies')
        console.log ( error )
    }
}

const mostPlayedReply = async(ctx) => {
    try {
        const mostPlayedData = await mostPlayed()
        for (let index = 0; index < mostPlayedData.length; index++) {
            const movies = mostPlayedData[index];
            const oneReplyData = `
*Title*: ${movies.movie.title},
*Year*: ${movies.movie.year}
*Watch Count*: ${movies.watcher_count}
*Play Count*:${movies.play_count}`
            ctx.replyWithMarkdown(oneReplyData);
        }

    } catch (error) {
        ctx.reply('error in fetching the most played')
        console.log ( error )
    }
}

// const reClickCommand = (ctx) => {
//     ctx.reply(',,,,,', {
//         reply_markup: {
//             inline_keyboard: [
//                 for (let index = 0; index < array.length; index++) {
//                     const element = array[index];
//                     [
//                         { text: 'Movies Info 🍿', callback_data: 'movies' }
//                     ]
//                 }
//             ]
             
//         },
//         parse_mode: "Markdown",
//         disable_web_page_preview: true
//     });
// }

bot.launch();

module.exports = {
    restartAfterResult
}