
var mongoose = require('mongoose');

var serviceProviderSchema = mongoose.Schema({

	local: {
		email: String,
		password: String,
		username : String,
		service: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
		complaints : [{
			type: mongoose.Schema.Types.ObjectId,
			ref : 'complaint'
		}]



	}
});

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
