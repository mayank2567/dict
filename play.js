'use strict';
const unirest = require('unirest');
const baseUrl = 'http://api.wordnik.com:80/v4/';
const dict = require('./unirest')
var word;
var output = [];
var res = dict.response;
var observe = require('observe')
var observer = observe(res)




function getRandomWord(call) {
    var url = `${baseUrl}words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;
    unirest.get(url)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .end(function (response) {
            word = response.body.word;
            dict.getAll(word)
            call();
        });
};

function ask() {
    setInterval(() => {
        console.log(res)
    }, 1000)
    observer.on('change', function (change) {
        debugger
    });
    inquirer.prompt(questions).then(answers => {
        output.push(answers.tvShow);
        if (answers.askAgain) {
            ask();
        } else {
            console.log('Your favorite TV Shows:', output.join(', '));
        }
    });
}

var questions = [{
        type: 'input',
        name: 'tvShow',
        message: "What's your favorite TV show?"
    },
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Want to enter another TV show favorite (just hit enter for YES)?',
        default: true
    }
];

getRandomWord(ask)