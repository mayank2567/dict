const unirest = require('unirest');
const baseUrl = 'http://api.wordnik.com:80/v4/';
const postUrl = '?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
const fullWord = require('./fullWord')
exports.def = function (word) {
    url = `${baseUrl}word.json/${word}/definitions${postUrl}`
    debugger
    unirest.get(url)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .end(function (response) {
            for (let i = 0; i < response.body.length; i++) {
                console.log(`${i + 1}:${response.body[i].text}`);
            }
        });
}

exports.syn = function (word) {
    url = `${baseUrl}word.json/${word}/relatedWords${postUrl}`
    unirest.get(url)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .end(function (response) {
            for (let i = 0; i < response.body.length; i++) {
                if (response.body[i].relationshipType === 'synonym') {
                    for (word in response.body[i].words) {
                        console.log(`${parseInt(word) + 1}:${response.body[i].words[word]}`);
                    }
                }
            }
        });
}

exports.ant = function (word) {
    url = `${baseUrl}word.json/${word}/relatedWords${postUrl}`
    unirest.get(url)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .end(function (response) {
            for (let i = 0; i < response.body.length; i++) {
                if (response.body[i].relationshipType === 'antonym') {
                    for (word in response.body[i].words) {
                        console.log(`${parseInt(word) + 1}:${response.body[i].words[word]}`);
                    }
                }
            }
        });
}

exports.ex = function (word) {
    url = `${baseUrl}word.json/${word}/examples${postUrl}`
    unirest.get(url)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .end(function (response) {
            for (let i = 0; i < response.body.examples.length; i++) {
                console.log(`${i + 1}:${response.body.examples[i].text}`);
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