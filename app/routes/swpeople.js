// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
const axios = require('axios')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const Saved = require('../models/people')
// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.post('/People', requireToken, (req, res, next) => {
	req.body.owner = req.user.id
	console.log("This is the res: ", req.body.info)
	Saved.create({
		name: req.body.info.name,
		eyeColor: req.body.info.eyeColor,
		hairColor: req.body.info.hairColor,
		skinColor: req.body.info.skinColor,
		mass: req.body.info.mass,
		height: req.body.info.height,
		affiliations: req.body.info.affiliations,
		born: req.body.info.born,
		died: req.body.info.died,
		species: req.body.info.species,
		diedLocation: req.body.info.diedLocation,
		bornLocation: req.body.info.bornLocation,
		image: req.body.info.image,
		wiki: req.body.info.wiki,
		homeworld: req.body.info.homeworld,
		gender: req.body.info.gender,
		owner: req.body.owner
	})
		.then(addedPerson => {
			console.log("Added :", addedPerson)
			res.json({ message: "Person Added", addedPerson })
		})
		.catch(next)
})

router.post('/newPerson/People', requireToken, (req, res, next) => {
	req.body.owner = req.user.id
	console.log("This is the res: ", req.body.info.name)
	Saved.create({
		name: req.body.info.name,
		eyeColor: req.body.info.eyeColor,
		hairColor: req.body.info.hairColor,
		skinColor: req.body.info.skinColor,
		mass: req.body.info.mass,
		height: req.body.info.height,
		affiliations: req.body.info.affiliations,
		born: req.body.info.born,
		died: req.body.info.died,
		species: req.body.info.species,
		diedLocation: req.body.info.diedLocation,
		bornLocation: req.body.info.bornLocation,
		image: req.body.info.image,
		wiki: req.body.info.wiki,
		homeworld: req.body.info.homeworld,
		gender: req.body.info.gender,
		owner: req.body.owner
	})
		.then(addedPerson => {
			console.log("Added :", addedPerson)
			res.json({ message: "Person Added", addedPerson })
		})
		.catch(next)
})

// GET Route for Favorited People
router.get('/saved', requireToken, (req, res, next) => {
	Saved.find()
		.then((people) => {
			const userPeople = people.filter(person => person.owner.toString() === req.user.id)
			return userPeople.map((person) => person.toObject())
		})
		.then((people) => res.status(200).json({ people: people }))
		.catch(next)
})

router.patch('/People/:id', requireToken, (req, res, next) => {
	Saved.findOneAndUpdate({
		"_id": req.params.id
	}, {
		"$set": {
			name: req.body.info.name,
			eyeColor: req.body.info.eyeColor,
			hairColor: req.body.info.hairColor,
			skinColor: req.body.info.skinColor,
			mass: req.body.info.mass,
			height: req.body.info.height,
			affiliations: req.body.info.affiliations,
			born: req.body.info.born,
			died: req.body.info.died,
			species: req.body.info.species,
			diedLocation: req.body.info.diedLocation,
			bornLocation: req.body.info.bornLocation,
			image: req.body.info.image,
			wiki: req.body.info.wiki,
			homeworld: req.body.info.homeworld,
			gender: req.body.info.gender
		}
	})
		// .then(handle404)
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DELETE Route for favorited people
router.delete('/saved/:id', requireToken, (req, res, next) => {
	Saved.findOneAndDelete({
		_id: req.params.id
	})
		.then(deletedPerson => {
			res.json({ message: "Deleted Person", deletedPerson })
		})
		.catch(err => {
			console.log('Failed to delete: ', err)
		})
})

module.exports = router
