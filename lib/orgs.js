'use strict'

const allOrgs = require('eco-counter-organisations')

const org = (req, res, next) => {
	res.json(allOrgs)
	next()
}

module.exports = org
