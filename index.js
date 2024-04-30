const {BOT_ID} = require('./config/env-config.js')
const { Telegraf } = require('telegraf')

const bot = new Telegraf(BOT_ID)
bot.start((ctx) => ctx.reply('Welcome, to the movie suggestion bot'))

bot.command('start', (ctx) => ctx.reply('Welcome'))
bot.command('start', Telegraf.reply('Welcome'))

bot.launch()
