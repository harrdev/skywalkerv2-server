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

// INDEX
var config = {
    method: 'GET',
    url: 'http://swapi.dev/api/films',
    headers: {
        "Authorization": `Bearer ${process.env.API_KEY}`
    } 
}
let page = ''
router.get('/Films', (req, res, next) => {
    axios(config)
        .then(function(response) {
            //console.log('Response data:\n', JSON.stringify(response.data))
            console.log(res.json(response.data))
        })
        .catch(function (error) {
            console.log(error);
        })   
})

module.exports = router