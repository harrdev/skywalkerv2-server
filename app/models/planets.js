const mongoose = require('mongoose')

const planetsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		rotationPeriod: {
			type: String,
			required: false,
		},
        orbitalPeriod: {
			type: String,
			required: false,
		},
        diameter: {
			type: String,
			required: false,
		},
        climate: {
			type: String,
			required: false,
		},
        gravity: {
			type: String,
			required: false,
		},
        terrain: {
			type: String,
			required: false,
		},
        terrain: {
            type: String,
            required: false,
        },
        surfaceWater: {
			type: String,
			required: false,
		},
        population: {
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

module.exports = mongoose.model('Planets', planetsSchema)