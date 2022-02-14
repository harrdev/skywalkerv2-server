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

// instantiate a router (mini app that only handles routes)
const router = express.Router()
router.post('/People', requireToken, (req, res, next) => {
	console.log("Server-side POST Route hit")
	console.log("Req.body: ", req.body)
	req.body.owner = req.user.id
	Saved.create({
		name: req.body.name,
		eyeColor: req.body.eyeColor,
		hairColor: req.body.hairColor,
		skinColor: req.body.skinColor,
		mass: req.body.mass,
		height: req.body.height,
		affiliations: req.body.affiliations,
		born: req.body.born,
		died: req.body.died,
		species: req.body.species,
		deathLocation: req.body.deathLocation,
		bornLocation: req.body.bornLocation,
		image: req.body.image,
		wiki: req.body.wiki,
		homeworld: req.body.homeworld,
		gender: req.body.gender,
		owner: req.body.owner
	})
		.then(addedPerson => {
			console.log("Added :", addedPerson)
			res.json({ message: "Person Added", addedPerson })
		})
		.catch(next)
})
module.exports = router