const express = require('express');
const router = express.Router();
const controller = require('./portfolio.controller');

router.post('/portfolio', (request, response) => {
    controller
        .create(request.body)
        .then(result => response.json(result));
});

router.get('/portfolio', (request, response) => {
    controller
        .get()
        .then(result => response.json(result));
});

module.exports = router;