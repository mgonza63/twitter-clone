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

app.post('/tweets', (req, res) => {
    console.log(req.body);
})


app.listen(3000, () => {
    console.log('Listening on port 3000');
})