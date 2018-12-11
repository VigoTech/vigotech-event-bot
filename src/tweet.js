module.exports.post = function (status) {
    const Twit = require('twit');

    const T = new Twit({
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        timeout_ms: 60 * 1000,
        strictSSL: true,
    });

    T.post('statuses/update', {status}, function (err, data) {
    /*eslint no-console: "error"*/
        console.log(data);
    });
};