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
    console.log("Server side API for getFave starships: ", req.body.info)
    Saved.find()
        .then((starships) => {
            const userStarships = starships.filter(starships => starships.owner.toString() === req.user.id)
            return userStarships.map((starships) => starships.toObject())
        })
        .then((starships) => res.status(200).json({ starships: starships }))
        .catch(next)
})

router.patch('/Starships/:id', requireToken, (req, res, next) => {
    Saved.findOneAndUpdate({
        "_id": req.params.id
    }, {
        "$set": {
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
            starship_class: req.body.info.starship_class,
            MGLT: req.body.info.MGLT,
            hyperdrive_rating: req.body.info.hyperdrive_rating
        }
    })
        // .then(handle404)
        .then(() => res.sendStatus(204))
        // if an error occurs, pass it to the handler
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
        cost_in_credits: req.body.info.cost_in_credits,
        length: req.body.info.length,
        crew: req.body.info.crew,
        max_atmosphering_speed: req.body.info.max_atmosphering_speed,
        passengers: req.body.info.passengers,
        cargo_capacity: req.body.info.cargo_capacity,
        consumables: req.body.info.consumables,
        starship_class: req.body.info.starship_class,
        MGLT: req.body.info.MGLT,
        hyperdrive_rating: req.body.info.hyperdrive_rating,
        owner: req.body.owner
    })
        .then(addedStarships => {
            console.log("Added :", addedStarships)
            res.json({ message: "Starship Added", addedStarships })
        })
        .catch(next)
})

router.post('/newStarship/Starship', requireToken, (req, res, next) => {
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
        starship_class: req.body.info.starship_class,
        MGLT: req.body.info.MGLT,
        hyperdrive_rating: req.body.info.hyperdrive_rating,
        owner: req.body.owner
    })
        .then(addedStarships => {
            console.log("Added :", addedStarships)
            res.json({ message: "Starship Added", addedStarships })
        })
        .catch(next)
})

module.exports = router