const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config()

const app = express();
const path = require('path')
// db
const monk = require('monk');
const db = monk(process.env.MONGO_URI || 'localhost/twitter'); // twitter is the name of the db
const tweets = db.get('tweets'); // name of the collection

const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//GET request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/tweets',(req, res)  => {
    tweets
    // find all and respond with json data
    .find()
    .then(tweets => {
        res.json(tweets);
    })
})

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


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})