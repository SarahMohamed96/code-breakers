var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewsSchema = mongoose.Schema({
	reviewName: {
		type: String

	},
	serviceid:{
		type: String
	}
});

var Review=module.exports = mongoose.model('Review', ReviewsSchema);


  module.exports.createReview = function(Review, callback){
 	Review.save(callback);
 }
