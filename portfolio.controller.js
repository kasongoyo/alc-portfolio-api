
const mongoose = require('mongoose');
const Portfolio = mongoose.model('Portfolio');

module.exports = {
    create(payload) {
        console.log(payload);
        return Portfolio.create(payload);
    },
    get() {
        return Portfolio.find();
    }
}