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
const Saved = require('../models/vehicles')
// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.get('/FaveVehicles', requireToken, (req, res, next) => {
	Saved.find()
		.then((vehicles) => {
			const userVehicles = vehicles.filter(vehicle => vehicle.owner.toString() === req.user.id)
			return userVehicles.map((vehicles) => vehicles.toObject())
		})
		.then((vehicles) => res.status(200).json({ vehicles: vehicles }))
		.catch(next)
})

router.delete('/FaveVehicles/:id', requireToken, (req, res, next) => {
	Saved.findOneAndDelete({
		_id: req.params.id
	})
		.then(deletedVehicles => {
			res.json({ message: "Deleted Vehicles", deletedVehicles })
		})
		.catch(err => {
			console.log('Failed to delete: ', err)
		})
})

router.post('/Vehicles', requireToken, (req, res, next) => {
    console.log("Server-side POST Route hit")
    console.log("Req.body: ", req.body)
    req.body.owner = req.user.id
    Saved.create({
        name: req.body.info.name,
        model: req.body.info.model,
        manufacturer: req.body.info.manufacturer,
        cost_in_credits: req.body.info.cost_in_credits,
        length: req.body.info.length,
        crew: req.body.info.crew,
        max_atmosphering_speed: req.body.info.max_atmosphering_speed,
        passengers: req.body.info.passengers,
        cargo_capacity: req.body.info.cargo_capacity,
        consumables: req.body.info.consumables,
        vehicle_class: req.body.info.vehicle_class,
        owner: req.body.owner
    })
        .then(addedVehicles => {
            console.log("Added :", addedVehicles)
            res.json({ message: "Vehicles Added", addedVehicles })
        })
        .catch(next)
})

router.post('/newVehicle/Vehicle', requireToken, (req, res, next) => {
    console.log("Server-side POST Route hit")
    console.log("Req.body: ", req.body)
    req.body.owner = req.user.id
    Saved.create({
        name: req.body.info.name,
        model: req.body.info.model,
        manufacturer: req.body.info.manufacturer,
        cost_in_credits: req.body.info.cost_in_credits,
        length: req.body.info.length,
        crew: req.body.info.crew,
        max_atmosphering_speed: req.body.info.max_atmosphering_speed,
        passengers: req.body.info.passengers,
        cargo_capacity: req.body.info.cargo_capacity,
        consumables: req.body.info.consumables,
        vehicle_class: req.body.info.vehicle_class,
        owner: req.body.owner
    })
        .then(addedVehicles => {
            console.log("Added :", addedVehicles)
            res.json({ message: "Vehicles Added", addedVehicles })
        })
        .catch(next)
})

module.exports = router