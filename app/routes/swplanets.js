// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
const axios = require('axios')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const Saved = require('../models/planets')
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.get('/FavePlanets', requireToken, (req, res, next) => {
	Saved.find()
		.then((planets) => {
			const userPlanet = planets.filter(planet => planet.owner.toString() === req.user.id)
			return userPlanet.map((planet) => planet.toObject())
		})
		.then((planet) => res.status(200).json({ planet: planet }))
		.catch(next)
})

router.delete('/FavePlanets/:id', requireToken, (req, res, next) => {
	Saved.findOneAndDelete({
		_id: req.params.id
	})
		.then(deletedPlanet => {
			res.json({ message: "Deleted Planet", deletedPlanet })
		})
		.catch(err => {
			console.log('Failed to delete: ', err)
		})
})

router.post('/Planets', requireToken, (req, res, next) => {
    console.log("Server-side POST Route hit")
    console.log("Req.body: ", req.body)
    req.body.owner = req.user.id
    Saved.create({
        name: req.body.info.name,
        rotation_period: req.body.info.rotation_period,
        orbital_period: req.body.info.orbital_period,
        diameter: req.body.info.diameter,
        terrain: req.body.info.terrain,
        climate: req.body.info.climate,
        gravity: req.body.info.gravity,
        surface_water: req.body.info.surface_water,
        population: req.body.info.population,
        owner: req.body.owner
    })
        .then(addedPlanet => {
            console.log("Added :", addedPlanet)
            res.json({ message: "Planet Added", addedPlanet })
        })
        .catch(next)
})

router.post('/newPlanet/Planet', requireToken, (req, res, next) => {
    console.log("Server-side POST Route hit")
    console.log("Req.body: ", req.body)
    req.body.owner = req.user.id
    Saved.create({
        name: req.body.info.name,
        rotation_period: req.body.info.rotation_period,
        orbital_period: req.body.info.orbital_period,
        diameter: req.body.info.diameter,
        terrain: req.body.info.terrain,
        climate: req.body.info.climate,
        gravity: req.body.info.gravity,
        surface_water: req.body.info.surface_water,
        population: req.body.info.population,
        owner: req.body.owner
    })
        .then(addedPlanet => {
            console.log("Added :", addedPlanet)
            res.json({ message: "Planet Added", addedPlanet })
        })
        .catch(next)
})

module.exports = router