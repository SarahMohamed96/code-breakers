var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
//schema for reservation
var ReservationSchema = mongoose.Schema({
	serviceid: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true
	},
	reservation_date: {
		type: Date,
		required: true
	},
	reservation_hour: {
		type: String,
		required: true
	}
});
//exporting reservation
var Reservation = module.exports = mongoose.model('Reservation', ReservationSchema);

//function change reservation
module.exports.changeReservation = function(changeReservation, callback){
	changeReservation.save(callback);
}

//function delete reservation
module.exports.deleteReservation = function(deletedReservation, callback){
	deletedReservation.remove(callback);
}

//function create promo code
module.exports.createPromoCode = function(text, callback){
	createPromoCode.save(callback);
}

//function get user by username
module.exports.getUserByUsername = function(userName, callback){
	var query = {userName: userName};
	Reservation.findOne(query, callback);
}
