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
	console.log("Server-side POST Route hit")
	console.log("Req.body: ", req.body.info.name)
	req.body.owner = req.user.id
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
		deathLocation: req.body.info.deathLocation,
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
module.exports = router
