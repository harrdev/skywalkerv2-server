const mongoose = require('mongoose')

const speciesSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		classification: {
			type: String,
			required: false,
		},
        average_height: {
			type: String,
			required: false,
		},
        skin_colors: {
			type: String,
			required: false,
		},
        hair_colors: {
			type: String,
			required: false,
		},
        eye_colors: {
			type: String,
			required: false,
		},
        average_lifespan: {
			type: String,
			required: false,
		},
        language: {
            type: String,
            required: false,
        },
        people: {
			type: Array,
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

module.exports = mongoose.model('Species', speciesSchema)