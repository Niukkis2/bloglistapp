const { response } = require('express')
const logger = require('./logger')

const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('---')
    next()
}

const unknownEndPoint = (req, res, next) => {
    res.status(404).send({ error: 'unknown endpoint' })
    next()
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message})
    } else if (error.name = 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }
    next(error)
}

const tokenExtractor = (req, res, next) => {
    const auth = req.get('authorization')
    if (auth) {
        req.token = auth.substring(7)
    }
    next()
}

module.exports = {
    requestLogger,
    unknownEndPoint,
    errorHandler,
    tokenExtractor
}
