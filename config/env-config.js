const env = require('dotenv')
env.config()


module.exports = {
    BOT_ID : process.env.BOT_TOKEN,
    API_KEY : process.env.API_KEY
}