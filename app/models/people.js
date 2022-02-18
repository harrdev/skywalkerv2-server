const mongoose = require('mongoose')

const peopleSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: false,
		},
		height: {
			type: String,
			required: false,
		},
        mass: {
			type: String,
			required: false,
		},
        hairColor: {
			type: String,
			required: false,
		},
        skinColor: {
			type: String,
			required: false,
		},
        eyeColor: {
			type: String,
			required: false,
		},
        born: {
			type: String,
			required: false,
		},
        died: {
            type: String,
            required: false,
        },
        gender: {
			type: String,
			required: false,
		},
        affiliations: {
            type: Array,
            required: false,
        },
        species: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        bornLocation: {
            type: String,
            required: false,
        },
        diedLocation: {
            type: String,
            required: false,
        },
        wiki: {
            type: String,
            required: false,
        },
        homeworld: {
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

module.exports = mongoose.model('People', peopleSchema)