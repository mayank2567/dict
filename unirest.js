const unirest = require('unirest');
const chalk = require('chalk');
const baseUrl = 'http://api.wordnik.com:80/v4/';
const postUrl = '?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
const fullWord = require('./fullWord')
var output = [];

var inquirer = require('inquirer');

var EventEmitter = require('events').EventEmitter;
var info = new EventEmitter();
var res = {};


exports.def = function (word, command) {
    url = `${baseUrl}word.json/${word}/definitions${postUrl}`
    unirest.get(url)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .end(function (response) {

            if (command === 'print') {
                console.log(chalk.yellow("\nDefinitions of the word\n"))
                for (let i = 0; i < response.body.length; i++) {
                    console.log(`${i + 1}:${response.body[i].text}`);
                }
            } else {
                debugger
                info.emit('def', response.body[0].text);
                res.def = response.body[0].text
            }
        });
}

exports.syn = function (word, command) {
    url = `${baseUrl}word.json/${word}/relatedWords${postUrl}`
    unirest.get(url)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .end(function (response) {
            debugger
            if (command === 'print') {
                console.log(chalk.yellow("\nSynonyms of the word\n"))
                for (let i = 0; i < response.body.length; i++) {
                    if (response.body[i].relationshipType === 'synonym') {
                        for (word in response.body[i].words) {
                            console.log(`${parseInt(word) + 1}:${response.body[i].words[word]}`);
                        }
                    }
                }
            } else if (command === 'all') {
                for (let i = 0; i < response.body.length; i++) {
                    if (response.body[i].relationshipType === 'synonym') {
                        res.syn = response.body[i].words
                    }
                }

            } else {
                for (let i = 0; i < response.body.length; i++) {
                    if (response.body[i].relationshipType === 'synonym') {
                        debugger

                        info.emit('syn', response.body[i].words[0]);

                        return
                    }
                }
                exports.def(word)
            }

        });
}

exports.ant = function (word, command) {
    url = `${baseUrl}word.json/${word}/relatedWords${postUrl}`
    unirest.get(url)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .end(function (response) {
            debugger
            if (command === 'print') {
                console.log(chalk.yellow("\nAntonyms of the word\n"))
                for (let i = 0; i < response.body.length; i++) {
                    if (response.body[i].relationshipType === 'antonym') {
                        for (word in response.body[i].words) {
                            console.log(`${parseInt(word) + 1}:${response.body[i].words[word]}`);
                        }
                    }
                }
            } else if (command === 'all') {
                for (let i = 0; i < response.body.length; i++) {
                    if (response.body[i].relationshipType === 'antonym') {
                        res.syn = response.body[i].words
                    }
                }

            } else {
                for (let i = 0; i < response.body.length; i++) {
                    if (response.body[i].relationshipType === 'antonym') {
                        debugger

                        info.emit('ant', response.body[i].words[0]);
                        return

                    }
                }
                exports.def(word)
            }

        });
}

exports.ex = function (word, command) {
    url = `${baseUrl}word.json/${word}/examples${postUrl}`
    unirest.get(url)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .end(function (response) {

            if (command === 'print') {
                console.log(chalk.yellow("\nExamples of the word\n"))
                for (let i = 0; i < response.body.examples.length; i++) {
                    console.log(`${i + 1}:${response.body.examples[i].text}`);
                }
            } else {
                res.ex = response.body.examples[0].text
                info.emit('ex', response.body.examples[0].text);
            }
        });
}

exports.wordOfTheDay = function () {

    var val
    var date = new Date();
    var dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    var url = `${baseUrl}words.json/wordOfTheDay?date=${dateStr}&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;

    unirest.get(url)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .end(function (response) {

            word = response.body.word;
            fullWord.fullWord(word);
        });
}

getAll = function (word) {

    func = [
        exports.def,
        exports.syn,
        exports.ant
    ]
    var index = Math.floor(Math.random() * (3))
    func[index](word)
    debugger
}

function getRandomWord(call) {
    var url = `${baseUrl}words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`;
    unirest.get(url)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .end(function (response) {
            word = response.body.word;
            getAll(word)
            welcome();
            call();
        });
};

function welcome() {
    console.log('Welcome to the game!!!\n')
}

function ask() {
    info.on('def', function (def) {
        console.log('Definition of the word is ', chalk.red(def));
        game();
    });

    info.on('ant', function (ant) {
        console.log('Antonym of the word is ', chalk.red(ant));
        game();
    });

    info.on('syn', function (syn) {
        console.log('Synonym of the word is ', chalk.red(syn));
        game();
    });


}

function game() {
    inquirer.prompt(questions).then(answers => {
        output.push(answers.word);
        if (answers.askAgain) {
            ask();
        } else {
            console.log('Your favorite TV Shows:', output.join(', '));
        }
    });
}
var questions = [{
        type: 'input',
        name: 'word',
        message: "Guess the word...."
    },
    {
        type: 'confirm',
        name: 'askAgain',
        message: 'Want to enter another TV show favorite (just hit enter for YES)?',
        default: true
    }
];

getRandomWord(ask)