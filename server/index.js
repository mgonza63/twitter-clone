const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

// db
const monk = require('monk');
const db = monk('localhost/twitter'); // twitter is the name of the db
const tweets = db.get('tweets'); // name of the collection

// middleware
app.use(cors());
app.use(express.json());

//GET request
app.get('/', (req, res) => {
    res.json({
        message: 'hello 🐔'
    })
});

// Validation for the POST request
function isTweetValid(tweet) {
    return tweet.name && tweet.name.toString().trim() !== '' &&
        tweet.content && tweet.content.toString().trim() !== ''
}

// POST request
app.post('/tweets', (req, res) => {
    if (isTweetValid(req.body)) {
        const tweet = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        };
        
        // calls the collection and adds the tweet to it with monk
        tweets
            .insert(tweet)
            .then(createdTweet => {
                res.json(createdTweet);
            })

    } else {
        res.status(422);
        res.json({
            message: 'Name or Content invalid'
        })
    }
})


app.listen(3000, () => {
    console.log('Listening on port 3000');
})