'use strict'

const {badRequest} = require('boom')
const {counters} = require('eco-counter-client')

const org = (req, res, next) => {
	const id = parseInt(req.params.id)
	if (Number.isNaN(id)) return next(badRequest('invalid id param'))

	counters(id)
	.then((counters) => {
		res.json(counters)
		next()
	})
	.catch(next)
}

module.exports = org
