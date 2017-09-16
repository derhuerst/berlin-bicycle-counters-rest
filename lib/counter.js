'use strict'

const {badRequest} = require('boom')
const {data} = require('eco-counter-client')

const counter = (req, res, next) => {
	const orgId = parseInt(req.params.orgId)
	if (Number.isNaN(orgId)) return next(badRequest('invalid orgId param'))
	const tableId = req.query['table-id']
	if (!tableId) return next(badRequest('invalid table-id param'))

	const instruments = req.query.instruments.split(',').map(id => parseInt(id))
	if (instruments.some(id => Number.isNaN(id))) {
		return next(badRequest('invalid instruments param'))
	}

	const start = req.query.start && new Date(parseInt(req.query.start) * 1000)
	if (Number.isNaN(+start)) return next(badRequest('invalid start param'))
	const end = req.query.end && new Date(parseInt(req.query.end) * 1000)
	if (Number.isNaN(+end)) return next(badRequest('invalid end param'))

	const id = req.params.id
	if (!id) return next(badRequest('invalid id param'))

	data(orgId, tableId, id, instruments, start, end)
	.then((data) => {
		res.json(data)
		next()
	})
	.catch(next)
}

module.exports = counter
