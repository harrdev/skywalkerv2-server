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
const Saved = require('../models/species')
// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.get('/FaveSpecies', requireToken, (req, res, next) => {
    Saved.find()
        .then((species) => {
            const userSpecies = species.filter(species => species.owner.toString() === req.user.id)
            return userSpecies.map((species) => species.toObject())
        })
        .then((species) => res.status(200).json({ species: species }))
        .catch(next)
})

router.patch('/Species/:id', requireToken, (req, res, next) => {
    Saved.findOneAndUpdate({
        "_id": req.params.id
    }, {
        "$set": {
            name: req.body.info.name,
            classification: req.body.info.classification,
            average_height: req.body.info.average_height,
            skin_colors: req.body.info.skin_colors,
            hair_colors: req.body.info.hair_colors,
            eye_colors: req.body.info.eye_colors,
            average_lifespan: req.body.info.average_lifespan,
            language: req.body.info.language,
            people: req.body.info.people
        }
    })
        // .then(handle404)
        .then(() => res.sendStatus(204))
        // if an error occurs, pass it to the handler
        .catch(next)
})

router.delete('/FaveSpecies/:id', requireToken, (req, res, next) => {
    Saved.findOneAndDelete({
        _id: req.params.id
    })
        .then(deletedSpecies => {
            res.json({ message: "Deleted Species", deletedSpecies })
        })
        .catch(err => {
            console.log('Failed to delete: ', err)
        })
})

router.post('/Species', requireToken, (req, res, next) => {
    console.log("Server-side POST Route hit")
    console.log("Req.body: ", req.body)
    req.body.owner = req.user.id
    Saved.create({
        name: req.body.info.name,
        classification: req.body.info.classification,
        average_height: req.body.info.average_height,
        skin_colors: req.body.info.skin_colors,
        hair_colors: req.body.info.hair_colors,
        eye_colors: req.body.info.eye_colors,
        average_lifespan: req.body.info.average_lifespan,
        language: req.body.info.language,
        people: req.body.info.people,
        owner: req.body.owner
    })
        .then(addedSpecies => {
            console.log("Added :", addedSpecies)
            res.json({ message: "Species Added", addedSpecies })
        })
        .catch(next)
})

router.post('/newSpecies/Species', requireToken, (req, res, next) => {
    console.log("Server-side POST Route hit")
    console.log("Req.body: ", req.body)
    req.body.owner = req.user.id
    Saved.create({
        name: req.body.info.name,
        classification: req.body.info.classification,
        average_height: req.body.info.average_height,
        skin_colors: req.body.info.skin_colors,
        hair_colors: req.body.info.hair_colors,
        eye_colors: req.body.info.eye_colors,
        average_lifespan: req.body.info.average_lifespan,
        language: req.body.info.language,
        people: req.body.info.people,
        owner: req.body.owner
    })
        .then(addedSpecies => {
            console.log("Added :", addedSpecies)
            res.json({ message: "Species Added", addedSpecies })
        })
        .catch(next)
})

module.exports = router