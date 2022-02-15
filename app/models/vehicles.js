const mongoose = require('mongoose')

const vehiclesSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: false,
            unique: true,
		},
		model: {
			type: String,
			required: false,
		},
        manufacturer: {
			type: String,
			required: false,
		},
        cost_in_credits: {
			type: String,
			required: false,
		},
        length: {
			type: String,
			required: false,
		},
        crew: {
			type: String,
			required: false,
		},
        max_atmosphering_speed: {
			type: String,
			required: false,
		},
        passengers: {
            type: String,
            required: false,
        },
        cargo_capacity: {
			type: String,
			required: false,
		},
        consumables: {
            type: String,
            required: false,
        },
        vehicle_class: {
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

module.exports = mongoose.model('Vehicles', vehiclesSchema)