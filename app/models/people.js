const mongoose = require('mongoose')

const peopleSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		height: {
			type: String,
			required: true,
		},
        mass: {
			type: String,
			required: true,
		},
        hair_color: {
			type: String,
			required: true,
		},
        skin_color: {
			type: String,
			required: true,
		},
        eye_color: {
			type: String,
			required: true,
		},
        birth_year: {
			type: String,
			required: true,
		},
        gender: {
			type: String,
			required: true,
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

module.exports = mongoose.model('People', peopleSchema)