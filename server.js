const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// instantiate mongoose
mongoose.connect(`mongodb://localhost:27017/alcdb`);

require('./portfolio.model');
// instantiate express server
const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = require('./portfolio.router');

app.use('/', router);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

// attach listener
app.listen(8080, function () {
    console.log(`Express is up listening on 8080`);
});