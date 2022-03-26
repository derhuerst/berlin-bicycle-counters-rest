'use strict'

const express = require('express')
const corser = require('corser')
const compression = require('compression')

const orgs = require('../lib/orgs')
const org = require('../lib/org')
const counter = require('../lib/counter')

const api = express()
api.use(corser.create()) // CORS
api.use(compression())

api.get('/orgs/:id', org)
api.get('/orgs', orgs)
api.get('/orgs/:orgId/counters/:id', counter)

api.use((err, req, res, next) => {
	console.error(err)
	if (res.headersSent) return next()
	res.status(err.statusCode || 500).json({error: true, msg: err.message})
	next()
})

module.exports = api
