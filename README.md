# 🎥 MOVIE TELEGRAM BOT 🎬

 A Telegram bot that provides movie information, popular movies, box office collections, most anticipated movies, and weekly most played movies.


## TABLE OF CONTENT 🍷

- INTRODUCTION
- SETUP
    - NODE ENV
    - API
- FEATURES
- USAGE
- CONTRIBUTING 
- CONTACT


## Introduction 🙏

Movie Bot is a simple and interactive bot for Telegram that allows users to get information about movies, including popular movies, recent box office collections, most anticipated movies, and weekly most played movies.

I've developed a project using Node.js environment, with the Telegraf npm package serving as the core component. The project utilizes data and information sourced from APIs such as OMDB and Trakt.

## Features 🔎

- Fetch movie information by title
- Display a list of popular movies
- Show recent box office collections
- List most anticipated movies
- Show weekly most played movies
- Easy navigation with inline keyboard buttons (The output of popular movies, box office collections, anticipated movies, most played movies are in form of inline keyboard so that when they are clicked it fetches the detailed information about that same movie)
![screenshot of /start](<screenshots/Screenshot 2024-06-10 at 10.08.26 PM.png>)

## Installation 🧑‍🔧

1. Clone the repository:
    ```bash
    git clone git@github.com:Himanshu-Mendhe/telegram-bot.git
    cd movie-bot
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `config` folder and add `env-config.js` with your `BOT_ID` and `API_KEY`:
    ```javascript
    module.exports = {
        BOT_ID: 'your-telegram-bot-id',
        API_KEY: 'your-api-key'
    };
    ```

4. Start the bot:
    ```bash
    node index.js
    ```

## Commands 🫡

- `/start` - Start the bot and display the main menu
- `Movies Info 🍿` - Get information about a specific movie
- `Popular Movies 🎬` - List popular movies
- `Recent Box Office Collection 💰` - Show recent box office collections
- `Most Anticipated Movies 🎥` - List most anticipated movies
- `Weekly Most Played Movies ⏯` - Show weekly most played movies
- `restart 👀` - Restart the bot   

## API Calls 📲

This bot makes use of several API endpoints to fetch data:

- `fetchMovie` - Fetches information about a specific movie
- `popularMovie` - Fetches a list of popular movies
- `boxOffice` - Fetches recent box office collections
- `anticipated` - Fetches a list of most anticipated movies
- `mostPlayed` - Fetches a list of weekly most played movies

The API calls are managed in the `apiCalls.js` file.

## CONTRIBUTING 🤝

Contributions are most welcomed!
Fork and open the pull request

## Contact 📇

- **GitHub**: [Himanshu Mendhe](https://github.com/Himanshu-Mendhe)
- **Email**: mendhehimanshu20@gmail.com