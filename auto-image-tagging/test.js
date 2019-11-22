require('dotenv').config()
const tagImage = require('./lib/tagger.js');
const main = require('./index.js');

tagImage('insert assset url here to check tags')
    .then(tags => console.log(tags))
    .catch(e => console.error(e))

