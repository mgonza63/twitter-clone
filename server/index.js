const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'hello 🐔'
    })
});

function isTweetValid(tweet) {
    return tweet.name && tweet.name.toString().trim !== '' &&
        tweet.content && tweet.content.toString().trim !== ''
}

app.post('/tweets', (req, res) => {
    if (isTweetValid(req.body)) {
        const tweet = {
            name: req.body.name.toString(),
            content: req.body.content.toString()
        };

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