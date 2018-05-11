const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
 	name: String,
 	title: String,
 	date: String,
 	description: String,
 	image: String
});

module.exports = mongoose.model('Review', ReviewSchema);