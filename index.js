'use strict'

const express = require('express')
const corser = require('corser')
const compression = require('compression')
const nocache = require('nocache')

const api = express()
api.use(corser.create()) // CORS
api.use(compression())

api.get('/orgs/:id', nocache(), org)
api.get('/orgs', orgs)

api.use((err, req, res, next) => {
	if (process.env.NODE_ENV === 'dev') console.error(err)
	if (res.headersSent) return next()
	res.status(err.statusCode || 500).json({error: true, msg: err.message})
	next()
})

api.listen(process.env.PORT || 3000)
