// VideoGames API
//Using postman and Node, create a videogames API
// use .env for your port number
// .gitignore file should ignore your node modules folder and your .env folder
// use morgan middleware
// create a models folder and a routes folder

//models folder
// create Games.js file inside models folder
// In Games.js file
// Create an array called videoGames with at least 2 object entries for video games:
// Each object should have an:
// id ('use unique string numbers for hard coded array entries')
// name
// description
// yearReleased
// playtime
// parent route should be /api/v1/games
// routes to create:
//     /getAllGames
//     /getSingleGame
//     /createGame
//     /updateGame
//     /deleteGame


//routes folder
// remember to use your status codes for each outcome
// getAllGames success should return a success confirmation and a list of the games in json
// getAllGames fail should return a fail confirmation and a message saying no games found
// getSingleGame  success should return a success confirmation and a json of the game info
// getSingleGame fail should return a fail confirmation and a message that game was not found
// createGame success should return a game created confirmation and a json of the game
// createGame fail should return a fail confirmation and a message that game was not created
// updateGame success should send a success confirmation and a message that the game was updated
// updateGame fail should send a fail confirmation and a message that the game could not be updated
// deleteGame success should send a success confirmation and a message that game was deleted
// deleteGame fail should send a fail confirmation and a message that game could not be deleted
// in createGame route, only name and description fields are required. If they are not there the game should not be created and a message should be sent saying both name and description are required
// createGame should fail if the game name already exists
// in your createGame route create the id dynamically by using uuidv4:
// UUID is an easy way to make fake id numbers for prototyping
// Read docs: https://www.npmjs.com/package/uuidv4
// in your updateGame check to see which routes have been updated and update only the parts of the route that were updated
//Use Postman to confirm that your routes fail and succeed correctly.
// create a middleware that contains an array of snarky quotes you either find or make up
// each time you log a snarky quote should  show in the console
// after you get the middleware working, comment out the middleware when you are working so it doesn't clutter your console

// Here is a dumb quote site if you want to use. Maybe pick the short ones so it doesn't clutter your console
// https://wpart.org/20-funny-web-developer-software-programmer-quotes/
//http://www.devtopics.com/101-great-computer-programming-quotes/

const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const gameRouter = require('./routes/gameRoutes.js');

const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Mongo error: ' + err));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1/games', gameRouter); // Parent route


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});