const mongoose = require('mongoose')

const planetsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
            unique: true,
		},
		rotation_period: {
			type: String,
			required: false,
		},
        orbital_period: {
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
        surface_water: {
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