const mongoose = require('mongoose');
const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    released: {
        type: String
    },
    playtime: {
        type: Number
    },
    secret: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

// name - make unique, lowercase, and required, string
// description - string, required
// released - string,
// playtime - number in minutes
// secret - string, required
// timestamp - date, default to the current date

module.exports = mongoose.model('game', GameSchema);

/*
let videoGames = [
    {
        id: 0,
        name: "DOOM",
        description: "First Person Shooter",
        yearReleased: 1993,
        playtime: 50000
    },
    {
        id: 1,
        name: "DOOM Eternal",
        description: "First Person Shooter",
        yearReleased: 2020,
        playtime: 24
    }
];

module.exports = videoGames;*/