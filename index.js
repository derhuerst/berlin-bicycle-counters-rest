'use strict'

const api = require('./api')

const server = api.listen(process.env.PORT || 3000, (err) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.info(`listening on port ${server.address().port}`)
})
