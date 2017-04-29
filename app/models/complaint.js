var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ComplaintsSchema = mongoose.Schema({
	complaintName: {
		type: String
	}
});

var Complaint=module.exports = mongoose.model('Complaint', ComplaintsSchema);


  module.exports.createComplaint = function(Complaint, callback){
 	Complaint.save(callback);
 }
