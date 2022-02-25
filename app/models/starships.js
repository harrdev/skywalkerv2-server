const mongoose = require('mongoose')

const starshipsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
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
        max_atmosphering_speed: {
			type: String,
			required: false,
		},
        crew: {
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
        hyperdrive_rating: {
            type: String,
            required: false,
        },
        MGLT: {
            type: String,
            required: false,
        },
        starship_class: {
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

module.exports = mongoose.model('Starships', starshipsSchema)