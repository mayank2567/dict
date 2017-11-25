'use strict';

const args = (process.argv[2]);
const params = args.split(':')
const func = args.split(':')[0]
const word = args.split(':')[1]
const unirest = require('./unirest');
const fullWord = require('./fullWord')




if (func && word) {
    unirest[func](word, 'print')
} else if (func === 'dict') {
    fullWord.fullWord(word)
} else if (!(word) && (func)) {
    fullWord.fullWord(func)
} else {
    unirest.wordOfTheDay();
}