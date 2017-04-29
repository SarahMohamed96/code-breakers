var mongoose 	= require('mongoose'),

var ratingSchema = new mongoose.Schema({

	rating: Number,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "service"

  }
	}
});

var Rating = mongoose.model("rating", ratingSchema);

module.exports = mongoose.model("Rating", ratingSchema);
