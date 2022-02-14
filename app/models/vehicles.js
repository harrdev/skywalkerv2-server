const mongoose = require('mongoose')

const vehiclesSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: false,
		},
		model: {
			type: String,
			required: false,
		},
        manufacturer: {
			type: String,
			required: false,
		},
        cost: {
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
        maxSpeed: {
			type: String,
			required: false,
		},
        passengers: {
            type: String,
            required: false,
        },
        cargoCapacity: {
			type: String,
			required: false,
		},
        consumables: {
            type: String,
            required: false,
        },
        vehicleClass: {
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