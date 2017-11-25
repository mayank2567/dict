const unirest = require('./unirest');
const baseUrl = 'http://api.wordnik.com:80/v4/';
const postUrl = '?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
var word;

function full(word) {
    return Promise.all([
        unirest.def(word, 'print'),
        unirest.syn(word, 'print'),
        unirest.ant(word, 'print'),
        unirest.ex(word, 'print')
    ]);
}
exports.fullWord = function (word) {
    full(word);
}