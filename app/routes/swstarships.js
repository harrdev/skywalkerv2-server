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
const Saved = require('../models/starships')
// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.get('/FaveStarships', requireToken, (req, res, next) => {
	Saved.find()
		.then((starships) => {
			const userStarships = starships.filter(starships => starships.owner.toString() === req.user.id)
			return userStarships.map((starships) => starships.toObject())
		})
		.then((starships) => res.status(200).json({ starships: starships }))
		.catch(next)
})

router.delete('/FaveStarships/:id', requireToken, (req, res, next) => {
	Saved.findOneAndDelete({
		_id: req.params.id
	})
		.then(deletedStarships => {
			res.json({ message: "Deleted Starship", deletedStarships })
		})
		.catch(err => {
			console.log('Failed to delete: ', err)
		})
})

router.post('/Starships', requireToken, (req, res, next) => {
    console.log("Server-side POST Route hit")
    console.log("Req.body: ", req.body)
    req.body.owner = req.user.id
    Saved.create({
        name: req.body.info.name,
        model: req.body.info.model,
        manufacturer: req.body.info.manufacturer,
        costInCredits: req.body.info.costInCredits,
        length: req.body.info.length,
        crew: req.body.info.crew,
        maxSpeed: req.body.info.max_atmosphering_speed,
        passengers: req.body.info.passengers,
        cargoCapacity: req.body.info.cargo_capacity,
        consumables: req.body.info.consumables,
        starshipClass: req.body.info.starship_class,
        mglt: req.body.info.mglt,
        hyperdriveRating: req.body.info.hyperdrive_rating,
        owner: req.body.owner
    })
        .then(addedStarships => {
            console.log("Added :", addedStarships)
            res.json({ message: "Starship Added", addedStarships })
        })
        .catch(next)
})

module.exports = router