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
const Saved = require('../models/films')
// instantiate a router (mini app that only handles routes)
const router = express.Router()

router.get('/FaveFilms', requireToken, (req, res, next) => {
	Saved.find()
		.then((films) => {
			const userFilm = films.filter(film => film.owner.toString() === req.user.id)
			return userFilm.map((film) => film.toObject())
		})
		.then((film) => res.status(200).json({ film: film }))
		.catch(next)
})

router.delete('/FaveFilms/:id', requireToken, (req, res, next) => {
	Saved.findOneAndDelete({
		_id: req.params.id
	})
		.then(deletedFilm => {
			res.json({ message: "Deleted Film", deletedFilm })
		})
		.catch(err => {
			console.log('Failed to delete: ', err)
		})
})

router.post('/Films', requireToken, (req, res, next) => {
    console.log("Server-side POST Route hit")
    console.log("Req.body: ", req.body)
    req.body.owner = req.user.id
    Saved.create({
        title: req.body.info.title,
        episode_id: req.body.info.episode_id,
        opening_crawl: req.body.info.opening_crawl,
        director: req.body.info.director,
        producer: req.body.info.producer,
        release_date: req.body.info.release_date,
        owner: req.body.owner
    })
        .then(addedFilm => {
            console.log("Added :", addedFilm)
            res.json({ message: "Film Added", addedFilm })
        })
        .catch(next)
})

router.post('/newFilm/Film', requireToken, (req, res, next) => {
    console.log("Server-side POST Route hit")
    console.log("Req.body: ", req.body)
    req.body.owner = req.user.id
    Saved.create({
        title: req.body.info.title,
        episode_id: req.body.info.episode_id,
        opening_crawl: req.body.info.opening_crawl,
        director: req.body.info.director,
        producer: req.body.info.producer,
        release_date: req.body.info.release_date,
        owner: req.body.owner
    })
        .then(addedFilm => {
            console.log("Added :", addedFilm)
            res.json({ message: "Film Added", addedFilm })
        })
        .catch(next)
})

module.exports = router