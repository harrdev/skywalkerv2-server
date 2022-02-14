const mongoose = require('mongoose')

const filmsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		episodeId: {
			type: String,
			required: false,
		},
        openingCrawl: {
			type: String,
			required: false,
		},
        director: {
			type: String,
			required: false,
		},
        producer: {
			type: String,
			required: false,
		},
        releaseDate: {
			type: String,
			required: false,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Films', FilmsSchema)