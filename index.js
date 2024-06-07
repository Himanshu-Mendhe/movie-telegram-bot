const { BOT_ID } = require('./config/env-config.js');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(BOT_ID);

const prefix = '/';
const ownerbot = 'Himanshu'; // Replace with actual ownerbot value

function menu(prefix, ctx, ownerbot) {
    // Generate the message content based on the context and parameters
    return `Hello ${ctx.from.first_name}, welcome to the bot!\nPrefix: ${prefix}\nOwner: ${ownerbot}`;
}

bot.start((ctx) => {
    ctx.reply('Welcome, to the movie suggestion bot');
    sendMessageStart(ctx);  // Call sendMessageStart with ctx when the bot starts
});

bot.command('creator', (ctx) => ctx.reply('himanshu'));

bot.command('movie', async (ctx) => {
    await ctx.reply('tell starting year');
    
    bot.on('text', (ctx) => {
        const year = ctx.message.text;  // Capture the year from the message text
        ctx.reply(`year is ${year}`);
    });
});

function sendMessageStart(ctx) {
    bot.telegram.sendMessage(ctx.chat.id, menu(prefix, ctx, ownerbot), {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Info👼🏻', callback_data: 'info' },
                    { text: 'Docs📚', callback_data: 'menu' },
                    { text: 'Ping🚀', callback_data: 'ping' }
                ],
                [
                    { text: 'WhatsApp Bot🤖', url: 'https://wa.me/6287771818443' }
                ]
            ]
        },
        parse_mode: "Markdown",
        disable_web_page_preview: true
    });
}

bot.launch();
