const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
    name: String,
    about: String,
    skills: [String]
});

//exports Portfolio model
module.exports = mongoose.model('Portfolio', PortfolioSchema);