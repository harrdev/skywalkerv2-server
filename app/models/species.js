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
        averageHeight: {
			type: String,
			required: false,
		},
        skinColor: {
			type: String,
			required: false,
		},
        hairColor: {
			type: String,
			required: false,
		},
        eyeColor: {
			type: String,
			required: false,
		},
        averageLifespan: {
			type: String,
			required: false,
		},
        language: {
            type: String,
            required: false,
        },
        peopleOfSpecies: {
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