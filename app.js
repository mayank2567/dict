'use strict';

const args = (process.argv.slice(2));

const func = args[0].split(':')[0]
const word = args[0].split(':')[1]
const unirest = require('./unirest');
const fullWord = require('./fullWord')




if (args[0] === ':') {
    unirest.wordOfTheDay();
} else if (args.length === 1) {
    fullWord.fullWord(func)
} else if (func === 'dict') {
    fullWord.fullWord(word)
} else {
    unirest[func](word)
}