var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

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

var Reservation = module.exports = mongoose.model('Reservation', ReservationSchema);


// module.exports.createReservation = function(newReservation, callback){
// 	newReservation.save(callback);
// }
//
module.exports.changeReservation = function(changeReservation, callback){
	changeReservation.save(callback);
}
//
//
module.exports.deleteReservation = function(deletedReservation, callback){
	deletedReservation.remove(callback);
}

module.exports.createPromoCode = function(text, callback){
	createPromoCode.save(callback);
}


module.exports.getUserByUsername = function(userName, callback){
	var query = {userName: userName};
	Reservation.findOne(query, callback);
}
