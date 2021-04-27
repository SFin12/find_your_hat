const Field = require("./classes.js");
const prompt = require('prompt-sync')({ sigint: true });


//allows user to select from one of three field sizes.
function setUpSize() {
    var size = prompt("Size of game (small, medium, large):  ").toLowerCase();

    if (size.includes('sm')) {
        size = [5, 10];
    } else if (size.includes('me')) {
        size = [10, 20];
    } else if (size.includes('la')) {
        size = [20, 40];
    } else {
        console.log('You must type "small, medium, or large".');
        setUpSize();
    }

    return size
};

//allows user to choose from one of three difficulties.
function setUpDifficulty() {
    var difficulty = prompt("Difficulty (easy, medium, hard):  ").toLowerCase();
    if (difficulty.includes('ea')) {
        difficulty = 8;
    } else if (difficulty.includes('me')) {
        difficulty = 25;
    } else if (difficulty.includes('ha')) {
        difficulty = 40;
    } else {
        console.log('Please type "easy, medium, or hard".')
        setUpDifficulty();
    }

    return difficulty;
};

//first function to run. Allows user to setup game.
function startGame() {
    var size = setUpSize();
    var difficulty = setUpDifficulty();
    var newField = Field.generateField(size[0], size[1], difficulty);
    var game = new Field(newField);
    var alive = true;
    console.log("Welcome to Hat Finder");
    console.log('controls: \n d = down, \n u = up, \n r = right, \n l = left');
    game.print();

    while (alive) {
        var move = prompt("Move:  ").toLowerCase();
        if (move === 'd' || move === 'u' || move === 'r' || move === 'l') {
            alive = game.update(move);
            game.print();
        } else {
            console.log("please use one of the following: u,d,r,l")
        }
    }
};

console.log("Welcome to Hat Finder");
console.log('controls: \n d = down, \n u = up, \n r = right, \n l = left');
startGame();


