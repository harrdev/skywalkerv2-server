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

// Favorited People
router.get('/saved', requireToken, (req, res, next) => {
    Saved.find()
        .then((people) => {
            const userPeople = people.filter(person => person.owner.toString() === req.user.id)
            // console.log("Fave person owner is: ", person)
            console.log("People id: ", person.owner)
            console.log("User people: ", people)
            console.log("Logged in user is: ", req.user.id)
            return userPeople.map((person) => person.toObject())
        })
        // respond with status 200 and JSON of the saved coins
        .then((people) => res.status(200).json({ people: people }))
        // if an error occurs, pass it to the handler
        .catch(next)
})

module.exports = router